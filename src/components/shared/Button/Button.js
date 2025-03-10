import styles from './Button.module.css'

export const Button = ({children, className, onClick, type, style}) => {
    return(
        <button
        style={style}
        className={`${className} ${styles.button}`}
        onClick={onClick}
        type={type}
        >{children}</button>
    )
}