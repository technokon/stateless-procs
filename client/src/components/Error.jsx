export const Error = ({ error, title = 'Error occurred' }) => {
    return <div>{ title ? `${title}: ` : '' } {error}</div>
}
