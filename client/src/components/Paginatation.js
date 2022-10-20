
const Pagination = () => {
    return (
        <div className="pagination">
            {ArrayPaginate.items.map((a) => (
                <div
                    onClick={() => handleClick(a + 1)}
                    className={`pagination__page ${
                        current === a + 1 ? "active" : null
                    }`}
                >
                    {a}{" "}
                </div>
            ))}
        </div>)
}

export default Pagination