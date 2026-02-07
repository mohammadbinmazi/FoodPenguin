export default function Input({
  label,
  name, // ✅ ADD THIS
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required,
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 tracking-wide">
          {label}
        </label>
      )}

      <input
        name={name} // ✅ ADD THIS
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`
          w-full rounded-xl border px-4 py-3 text-base
          font-sans font-normal tracking-wide
          transition-all duration-200 ease-out
          focus:outline-none focus:ring-1 focus:ring-offset-1
          placeholder:text-gray-400
          ${
            error
              ? "border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-red-200"
              : "border-gray-200 bg-white/80 focus:border-orange-600 focus:ring-orange-200"
          }
        `}
      />

      {error && (
        <p className="text-sm font-medium text-red-500 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  );
}
