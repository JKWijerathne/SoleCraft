import React from 'react';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseStyles = "relative flex items-center justify-center gap-3 py-4 px-8 rounded-2xl font-extrabold uppercase tracking-widest text-xs transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden";

  const variants = {
    primary: "bg-[#F5B942] text-[#071A2F] hover:bg-[#D99A20] border-2 border-[#F5B942] shadow-[0_10px_24px_rgba(245,185,66,0.28)]",
    secondary: "bg-[#071A2F] text-white hover:bg-[#111827] shadow-[0_10px_24px_rgba(7,26,47,0.25)] hover:shadow-[0_14px_32px_rgba(7,26,47,0.35)]",
    outline: "bg-white border border-[#CBD5E1]/80 text-[#071A2F] hover:bg-[#071A2F] hover:text-white hover:border-[#071A2F]",
    ghost: "bg-transparent text-[#071A2F] hover:bg-[#071A2F]/8",
    danger: "bg-red-600 text-white hover:bg-red-500"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 z-10" />}
      <span className="z-10">{children}</span>
    </button>
  );
};

export default Button;