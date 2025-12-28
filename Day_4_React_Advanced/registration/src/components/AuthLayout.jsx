const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-gradient">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
            {title}
          </h1>
          <p className="text-gray-400">{subtitle}</p>
        </div>
        <div className="auth-card p-8">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
