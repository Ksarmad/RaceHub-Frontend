import type { InputHTMLAttributes } from "react";

import clsx from "clsx";

interface Props
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function TextInput({
  label,
  error,
  className,
  ...props
}: Props) {
  return (
    <div className="space-y-2">
      <label
        className="
          text-sm
          font-medium
          text-zinc-300
        "
      >
        {label}
      </label>

      <input
        className={clsx(
          `
          w-full
          rounded-xl
          border
          border-red-500/20
          bg-black/40
          px-4
          py-3
          text-white
          outline-none
          transition-all
          duration-300

          placeholder:text-zinc-500

          focus:border-red-500
          focus:ring-2
          focus:ring-red-500/30

          `,
          error &&
            `
            border-red-500
            ring-2
            ring-red-500/20
          `,
          className
        )}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default TextInput;