import React from "react";

const DraggableBox = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => (
  <div ref={ref} className="absolute p-2 text-white rounded shadow-md">
    {children}
  </div>
));
export default DraggableBox;
