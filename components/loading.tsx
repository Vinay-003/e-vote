import react from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 border-t-2 border-b-2 border-primary rounded-full animate-spin">
        Loading...
      </div>
    </div>
  );
}