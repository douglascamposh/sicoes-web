
const Button = ({ children, className, onClick }) => (
    <div>
        <button
            className={`text white${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    </div>
)


export default Button;

