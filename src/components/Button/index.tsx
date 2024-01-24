import { ButtonHTMLAttributes } from 'react';
import * as Styled from './styles';
import { useSession } from 'next-auth/client';

export type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  disabled = false,
  onClick,
  icon,
  color = 'primary',
}: ButtonProps) => {
  const [session] = useSession();
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Styled.Button
      disabled={disabled || session?.user?.name == 'Visitor'}
      onClick={handleClick}
      color={color}
    >
      {children}
      {!!icon && icon}
    </Styled.Button>
  );
};
