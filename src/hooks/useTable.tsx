import { TablePaginationConfig } from "antd";
import { useState } from "react";

const useTable = () => {
    const [dataSet, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearchState] = useState("");
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 5,
        total: 0,
    });
    const [reload, setReload] = useState(true);

    const setSearch = (e: string) => {
        if (search !== e) {
            setPagination((prev) => ({ ...prev, current: 1 }));
        }
        setSearchState(e);
    };

    return {
        dataSet,
        setData,
        loading,
        setLoading,
        search,
        setSearch,
        pagination,
        setPagination,
        reload,
        setReload,
    };
};

export default useTable;
