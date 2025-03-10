import styles from './Button.module.css'

export const Button = ({children, className, onClick, type, style, disabled}) => {
    return(
        <button
        style={style}
        disabled={disabled}
        className={`${className} ${styles.button}`}
        onClick={onClick}
        type={type}
        >{children}</button>
    )
}