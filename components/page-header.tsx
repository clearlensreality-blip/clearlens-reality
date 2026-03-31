"use client";

interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
        {title}
      </h1>

      <p className="text-gray-400 text-lg max-w-2xl">
        {description}
      </p>
    </div>
  );
}
