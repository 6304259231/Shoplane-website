
let useLoader = ()=>{
    return (
        <center style={{ width: '70%', margin: '80px auto', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </center>
    )
}

export default useLoader;