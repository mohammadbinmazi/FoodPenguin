const Drawer = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[1px] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-xl">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-white to-gray-50/95 shadow-2xl">
            {/* Decorative edge */}
            <div className="absolute left-0 top-0 h-full w-1 "></div>

            {/* Content container */}
            <div className="h-full w-full overflow-y-auto pl-5 pr-6 py-7">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
