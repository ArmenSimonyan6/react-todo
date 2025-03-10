import styles from './Input.module.css'

export const Input = ({type, onChange, className, placeholder, value}) => {
    return (
        <input
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className={`${className} ${styles.input}`}
        />
    )
}
