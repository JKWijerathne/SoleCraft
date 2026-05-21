import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  label,
  error,
  icon: Icon,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-black uppercase tracking-widest text-[#111827]/60 ml-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#111827]/45 group-focus-within:text-[#D99A20] transition-colors">
            <Icon className="w-5 h-5" />
          </div>
        )}

        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full bg-white border rounded-2xl px-5 py-4 text-[#071A2F] placeholder:text-[#111827]/35 focus:outline-none focus:ring-2 focus:ring-[#F5B942]/50 transition-all duration-300 shadow-sm
            ${Icon ? 'pl-12' : ''}
            ${error ? 'border-red-500 focus:border-red-500' : 'border-[#CBD5E1]/80 focus:border-[#F5B942]'}
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#111827]/45 hover:text-[#071A2F] transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>

      {error && (
        <span className="text-xs font-semibold text-red-500 ml-1 flex items-center gap-1 mt-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;