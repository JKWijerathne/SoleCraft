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
  const baseStyles = "relative flex items-center justify-center gap-3 py-4 px-8 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden";

  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 border-2 border-white",
    secondary: "bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]",
    outline: "bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black",
    ghost: "bg-transparent text-white hover:bg-white/10",
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
