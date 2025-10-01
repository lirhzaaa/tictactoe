const Button = (props) => {
  const {
    children,
    onClick,
    color = "bg-blue",
    textColor = "text-white",
    className = "",
    type = "button",
  } = props;
  return (
    <button
      className={`${color} ${textColor} font-bold items-center ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
