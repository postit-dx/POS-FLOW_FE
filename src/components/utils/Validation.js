export default function validateAddFormInput( /* 차량 등록 validation */
    vehicleNumber, vehicleInDatetime, vehicleOutDatetime,
    driverName, driverBirth, driverPhoneNumber,
    employeeName, employeeDepartment, employeePhoneNumber
) {
    if(!(validateTextInput(vehicleNumber)) || 
        !(validateTextInput(driverName)) || 
        !(validateTextInput(employeeName)) || 
        !(validateTextInput(employeeDepartment))) {
        alert('모두 입력해주세요.');
        return false;
    } else if(!validateBirth(driverBirth)) {
        alert('생년월일을 확인해주세요.');
        return false;
    } else if(!validateDatetime(vehicleInDatetime, vehicleOutDatetime)) {
        alert('출발 일시와 방문 기간을 확인해주세요');
        return false;
    } else if(!validatePhoneNumber(driverPhoneNumber) || 
        !validatePhoneNumber(employeePhoneNumber)) {
        alert('핸드폰 번호를 확인해주세요.');
        return false;
    }

    return true;
}

export function validateTextInput(text) { /* text field 검사 */
    return !!text && text.trim() !== '';
}

export function validateBirth(birth) { /* 생년월일 검사 */
    const today = new Date();
    const birthDate = new Date(birth);

    if (birthDate >= today) return false;
    else return true;
}

export function validateDatetime(inDatetime, outDatetime) { /* 출발일시, 방문시간 검사 */
    const inDate = new Date(inDatetime);
    const outDate = new Date(outDatetime);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (inDate < today || outDate < today) return false;
    return outDate > inDate;
}

export function validatePhoneNumber(phoneNumber) { /* 전화번호 검사 */
    const phonePattern = /^\d{3}-\d{3,4}-\d{4}$/;
    return phonePattern.test(phoneNumber);
}

export function validateSearchVehicleInDatetime(start, end) {
    if(start === '' || end === '' || end < start) {
        alert('출발일시를 확인해주세요');
        return false;
    } else {
        return true;
    }
}