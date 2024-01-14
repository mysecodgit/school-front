const WidgetCard = ({ title, value, valuePrefix, icon }) => {
    const renderValue = (value, prefix) => {
        if (prefix) return value || value === 0 ? prefix + value : "...";
        return value || value === 0 ? value : "...";
    };

    return (
        <div className="col-12 lg:col-6 xl:col-3">
            <div className="card mb-0">
                <div className="flex justify-content-between">
                    <div>
                        <span className="block text-500 font-medium mb-3">{title}</span>
                        <div className="text-900 font-medium text-xl">{renderValue(value, valuePrefix)}</div>
                    </div>
                    {/* <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}> */}
                    <i className={`${icon} text-xl`} />
                    {/* </div> */}
                </div>
                {/* <span className="text-green-500 font-medium">24 new </span>
                <span className="text-500">since last visit</span> */}
            </div>
        </div>
    );
};

export default WidgetCard;
