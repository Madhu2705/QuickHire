import React from 'react';

const DashboardLayout = ({ children, sidebar }) => {
  return (
    <div className="flex">
      {sidebar}
      <main className="flex-1 bg-bgLight min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
