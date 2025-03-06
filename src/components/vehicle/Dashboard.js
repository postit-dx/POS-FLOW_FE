import React, { useEffect, useState } from 'react';
import '../../styles/css/vehicle/Dashboard.css';
import Modal from 'react-modal';
import AddForm from './AddForm.js';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ClientSideRowModelModule, PaginationModule, themeQuartz } from 'ag-grid-community';

Modal.setAppElement('#root');
ModuleRegistry.registerModules([AllCommunityModule]);

function Dashboard({vehicles, fetchVehicles}) {
    const [modalOpen, setModalOpen] = useState(false);

    const [initIsApproved, setInitIsApproved] = useState();
    const [apDatetime, setApDatetime] = useState();
    const [initNeedInspection, setInitNeedInspection] = useState();

    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([
        { field: "number", headerName: "차량번호", wrapText: true, autoHeight: true, cellStyle: { textAlign: "left" }, flex: 3},
        { field: "driverName", headerName: "방문자명", flex: 3, wrapText: true, autoHeight: true },
        { field: "driverBirth", headerName: "방문자 생년월일", flex: 3, wrapText: true, autoHeight: true},
        { field: "driverPhone", headerName: "방문자 전화번호", flex: 3, wrapText: true, autoHeight: true },
        { field: "inDatetime", headerName: "출발일시", flex: 3, wrapText: true, autoHeight: true},
        { field: "outDatetime", headerName: "방문기간", flex: 3, wrapText: true, autoHeight: true },
        { headerName: "Po No", flex: 3, wrapText: true, autoHeight: true },
        { headerName: "공급사 ITEM", flex: 3, wrapText: true, autoHeight: true },
        { headerName: "운송코드", flex: 3, wrapText: true, autoHeight: true},
        { headerName: "진행상태", flex: 3, wrapText: true, autoHeight: true },
        { headerName: "출입신청번호", flex: 3, wrapText: true, autoHeight: true },
        {
            field: "isApproved",
            headerName: "차량승인여부",
            cellRendererFramework: (params) => {
                return (
                    <RadioDataField
                        vehicleDetail={params.data}
                        radioOptions={[
                            { id: 'Y', label: '승인', value: 'Y', checked: params.data.isApproved === 'Y', field: 'isApproved' },
                            { id: 'N', label: '반려', value: 'N', checked: params.data.isApproved === 'N', field: 'isApproved' }
                        ]}
                        onRadioChange={handleRadioChange}
                        selectedOption='isApproved'
                        initValue={params.data.isApproved}
                        onChangeRadioStatus={putVehicleApproveStatus}
                    />
                );
            },
            flex: 3
        },
        {
            field: "needInspection",
            headerName: "검수대상여부",
            cellRendererFramework: (params) => {
                return (
                    <RadioDataField
                        vehicleDetail={params.data}
                        radioOptions={[
                            { id: 'Y', label: '승인', value: 'Y', checked: params.data.needInspection === 'Y', field: 'needInspection' },
                            { id: 'N', label: '반려', value: 'N', checked: params.data.needInspection === 'N', field: 'needInspection' }
                        ]}
                        onRadioChange={handleRadioChange}
                        selectedOption='needInspection'
                        initValue={params.data.needInspection}
                        onChangeRadioStatus={putVehicleInspectionStatue}
                    />
                );
            },
            flex: 3
        },
        { field: "employeeName", headerName: "피방문자", flex: 3  },
        { field: "employeeDep", headerName: "피방문자 부서", flex: 3},
        { field: "employeePhone", headerName: "차량승인일자", flex: 3}
    ]);

    const [highlightedColumnId, setHighlightedColumnId] = useState(null);
    const handleCellMouseOver = (event) => {
        setHighlightedColumnId(event.column.getColId());
    };
    const handleCellMouseOut = () => {
        setHighlightedColumnId(null);
    };
    const getCellClass = (params) => {
        if (params.column.getColId() === highlightedColumnId) {
            return 'highlighted-column';
        }
        return '';
    };

    useEffect(() => {
        setRowData(vehicles);
        console.log(vehicles);
    }, [vehicles]);

    const myTheme = themeQuartz.withParams({
        // headerHeight: '40px',
        headerCellHoverBackgroundColor: 'rgba(0, 165, 229, 0.3)',
        headerColumnBorder:{ style: "solid" },       
        borderColor: "#A4A4A4", // 그리드 테두리 색
        wrapperBorder: false, // 그리드 테두리 존재 여부
        headerRowBorder: false,
        rowBorder: { style: "solid" },
        columnBorder: { style: "solid" },
        wrapperBorderRadius: '0px', 
    });

    const defaultColDef = {
        suppressMovable: true,
        // resizable: false,
        resizable: true,
        wrapText: true,
        autoHeight: true
    };

    const getRowHeight = (params) => {
        return params.node?.rowHeight ? params.node.rowHeight : 40; // 기본값 40
    };    

    const handleCellClicked = (event) => {        
        const rowData = event.data;
        console.log(rowData);
    }; 

    return (
        <div className='table-container'>
            <button 
                className='add-vehicle-button'
                onClick={ () => setModalOpen(true) }
                >신규 차량 등록</button>

            <Modal
                isOpen={modalOpen}
                shouldCloseOnOverlayClick={false}
                onRequestClose={ () => setModalOpen(false) }
                className='form-modal' 
                overlayClassName='form-overlay'>
                    <AddForm setModalOpen={setModalOpen} fetchVehicles={fetchVehicles}/>
            </Modal>

            <AgGridReact
                domLayout='autoHeight'
                theme={myTheme}
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                modules={[ClientSideRowModelModule, PaginationModule]}
                pagination={true}
                paginationPageSize={50}
                paginationPageSizeSelector={false}
                onCellClicked={handleCellClicked} 
                onCellMouseOver={handleCellMouseOver}
                onCellMouseOut={handleCellMouseOut}
                // getRowHeight={() => { return 22; }}
                // getRowHeight={getRowHeight}
                getCellClass={getCellClass}
                style={{ width: '100%'}}
            />
        </div>
    );
}

function RadioDataField({
    vehicleDetail,
    radioOptions, 
    onRadioChange, 
    selectedOption, 
    initValue,
    onChangeRadioStatus
}) {
    const disabledButtonColor = 'RGB(5, 80, 125)';
    const enabledButtonColor = 'RGB(0, 165, 229';

    return (
        <div className='context-container'>
            <div>
                {radioOptions.map(option => (
                    <div
                        className='radio-container'
                        key={option.id}>
                            <input
                                type='radio'
                                id={option.id}
                                value={option.value}
                                checked={vehicleDetail[selectedOption] === option.value}
                                onChange={() => onRadioChange(option.field, option.value)}
                                />
                        {option.label}
                    </div>
                ))}

                <button 
                    onClick={() => {
                        if(selectedOption === 'isApproved') {
                            onChangeRadioStatus(vehicleDetail.isApproved);
                        } else {
                            onChangeRadioStatus(vehicleDetail.needInspection);
                        }
                    }}
                    className='update-button'
                    style={{ backgroundColor: vehicleDetail[selectedOption] === initValue ? disabledButtonColor : enabledButtonColor }}
                    disabled={vehicleDetail[selectedOption] === initValue}
                    >
                    변경하기
                </button>
            </div>
        </div>
    )
}

export default Dashboard;

