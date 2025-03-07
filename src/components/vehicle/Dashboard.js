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

    const [vehicleDetail, setVehicleDetail] = useState({});

    const [initIsApproved, setInitIsApproved] = useState();
    const [apDatetime, setApDatetime] = useState();
    const [initNeedInspection, setInitNeedInspection] = useState();

    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([
        
        {
            field: "isApproved",
            headerName: "차량승인여부",
            cellRenderer: (params) => {
            return React.createElement(RadioDataField, {
                vehicleDetail: params.data,
                radioOptions: [
                    { id: 'Y', label: '승인', value: 'Y', checked: params.data.isApproved === 'Y', field: 'isApproved' },
                    { id: 'N', label: '반려', value: 'N', checked: params.data.isApproved === 'N', field: 'isApproved' }
                ],
                onRadioChange: handleRadioChange,
                selectedOption: 'isApproved',
                initValue: params.data.isApproved,
                onChangeRadioStatus: putVehicleApproveStatus
            });
        },

        },
        {
            field: "needInspection",
            headerName: "검수대상여부",
            cellRenderer: (params) => {
                return React.createElement(RadioDataField, {
                    vehicleDetail: params.data,
                    radioOptions: [
                        { id: 'Y', label: '승인', value: 'Y', checked: params.data.needInspection === 'Y', field: 'needInspection' },
                        { id: 'N', label: '반려', value: 'N', checked: params.data.needInspection === 'N', field: 'needInspection' }
                    ],
                    onRadioChange: handleRadioChange,
                    selectedOption: 'needInspection',
                    initValue: params.data.needInspection,
                    onChangeRadioStatus: putVehicleInspectionStatus
                });
            },

        },
        { field: "vehicleNumber", headerName: "차량번호", wrapText: true, autoHeight: true, cellStyle: { textAlign: "left" }},
        { field: "driverName", headerName: "방문자명", wrapText: true, autoHeight: true },
        { field: "driverBirth", headerName: "방문자\n생년월일", wrapText: true, autoHeight: true},
        { field: "driverPhoneNumber", headerName: "방문자\n전화번호", wrapText: true, autoHeight: true },
        { field: "vehicleInDatetime", headerName: "출발일시", wrapText: true, autoHeight: true},
        { field: "vehicleOutDatetime", headerName: "방문기간", wrapText: true, autoHeight: true },
        { field: "poNo", headerName: "Po No", wrapText: true, autoHeight: true },
        { field: "supplyItem", headerName: "공급사\nITEM", wrapText: true, autoHeight: true },
        { field: "deliveryCode", headerName: "운송코드",  wrapText: true, autoHeight: true},
        { field: "process", headerName: "진행상태",  wrapText: true, autoHeight: true },
        { field: "supplyItem", headerName: "출입신청번호", wrapText: true, autoHeight: true },
        { field: "isApprovedDatetime", headerName: "차량승인일자"},
        // { field: "employeeName", headerName: "피방문자", flex: 3  },
        // { field: "employeeDepartment", headerName: "피방문자\n부서", flex: 3},
        // { field: "employeePhoneNumber", headerName: "피방문자\n전화번호", flex: 3}
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

    const handleRadioChange = (field, value, vehicleId) => {
        console.log(field, value, vehicleId);
        // setVehicleDetail((prevVehicleDetail) => ({
        //     ...prevVehicleDetail,
        //     [vehicleId]: {
        //         ...prevVehicleDetail[vehicleId],
        //         [field]: value
        //     }
        // }));
    };

    useEffect(() => {
        setRowData(vehicles);
    }, [vehicles]);

    const putVehicleApproveStatus = async (option, vehicleId) => {
        try {
            const response = await axios.put(`/api/vehicle/${vehicleId}/changeApproval?isApproved=${option}`);
            const { data } = response.data;

            // setInitIsApproved(data.isApproved);         
            // saveIsApproved(data.isApproved, data.apDatetime);
            setVehicleDetail(prev => ({
                ...prev,
                [vehicleId]: {
                    ...prev[vehicleId],
                    isApproved: data.isApproved
                }
            }));
        } catch(err) {
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    }

    const putVehicleInspectionStatus= async (option, vehicleId) => {
        try {
            const response = await axios.put(`/api/vehicle/${vehicleId}/changeNeedInspection?needInspection=${option}`);
            const { data } = response.data;

            // setInitNeedInspection(data.needInspection);
            // saveNeedInspection(data.needInspection);
            setVehicleDetail(prev => ({
                ...prev,
                [vehicleId]: {
                    ...prev[vehicleId],
                    needInspection: data.needInspection
                }
            }));
        } catch(err) {
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    }

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
        width: 300,
        suppressMovable: true,
        resizable: false,
        // resizable: true,
        wrapText: true,
        autoHeight: true,
        cellStyle: { 
            whiteSpace: 'normal', // 줄바꿈을 가능하게 하는 스타일 추가
        }
    };
    
    const handleCellClicked = (event) => {        
        const rowData = event.data;
        console.log(rowData);
    }; 
      
    return (
        <div className='table-container' style={{ width: '100%', overflowX: 'auto' }}>
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
                style={{minHeight:'100px'}}
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
                getRowHeight={() => { return 30; }}
                getCellClass={getCellClass}
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
                                onChange={() => onRadioChange(option.field, option.value, vehicleDetail.id)}
                                />
                        {option.label}
                    </div>
                ))}

                <button 
                    onClick={() => {
                        if(selectedOption === 'isApproved') {
                            onChangeRadioStatus(vehicleDetail.isApproved, vehicleDetail.id);
                        } else {
                            onChangeRadioStatus(vehicleDetail.needInspection, vehicleDetail.id);
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

