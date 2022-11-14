// TODO: 이 곳에 정답 코드를 작성해주세요.
// 1. 페이지가 로드 된 시점에 ID입력 창에 Foucs가 되어 있어야 합니다.
// 대상: ID 입력 input
// 이벤트: 페이지가 로드 되었을때
// 핸들러: Foucs()

const $inputs = document.querySelectorAll('.form-wrapper input')
const $id = document.getElementById('id')
const $pw = document.getElementById('pw')
const $pwCheck = document.getElementById('pw-check')
const $idMsg = document.getElementById('id-msg')
const $pwMsg = document.getElementById('pw-msg')
const $pwCheckMsg = document.getElementById('pw-check-msg')
const $submit = document.getElementById('submit')
const $modal = document.getElementById('modal')

window.addEventListener('load', () => $id.focus())

const ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')
const PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}$')

const ID_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
}
const PW_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
}
const PWCHECK_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '비밀번호가 일치하지 않습니다.',
}

const checkIdRegex = (value) => {
    if (value.length === 0) {
        return 'required'
    } else {
        return ID_REGEX.test(value) ? true : 'invalid'
    }
}
const checkIdValidation = (value) => {
    const isValidId = checkIdRegex(value)

    if (isValidId !== true) {
        $id.classList.add('border-red-600')
        $idMsg.innerText = ID_ERROR_MSG[isValidId]
    } else {
        $id.classList.remove('border-red-600')
        $idMsg.innerText = ''
    }
    return isValidId
}
$id.addEventListener('focusout', (e) => checkIdValidation(e.target.value))

const checkPwRegex = (value) => {
    if (value.length === 0) {
        return 'required'
    } else {
        return PW_REGEX.test(value) ? true : 'invalid'
    }
}

const checkPwValidation = (value) => {
    const isValidPw = checkPwRegex(value)

    if (isValidPw !== true) {
        $pw.classList.add('border-red-600')
        $pwMsg.innerText = PW_ERROR_MSG[isValidPw]
    } else {
        $pw.classList.remove('border-red-600')
        $pwMsg.innerText = ''
    }
    return isValidPw
}
$pw.addEventListener('focusout', (e) => checkPwValidation(e.target.value))

const checkPwCheckRegex = (value) => {
    if (value.length === 0) {
        return 'required'
    } else {
        return value === $pw.value ? true : 'invalid'
    }
}
const checkPwCheckValidation = (value) => {
    const isValidPwCheck = checkPwCheckRegex(value)

    if (isValidPwCheck !== true) {
        $pwCheck.classList.add('border-red-600')
        $pwCheckMsg.innerText = PWCHECK_ERROR_MSG[isValidPwCheck]
    } else {
        $pwCheck.classList.remove('border-red-600')
        $pwCheckMsg.innerText = ''
    }
    return isValidPwCheck
}
$pwCheck.addEventListener('focusout', (e) =>
    checkPwCheckValidation(e.target.value)
)

// 4. 입력 확인 모달 창 구현
// 제출하기 버튼 클릭 시, 모든 input의 값이 유효한 상태일 경우 입력한 아이디와 비밀번호를 확인할 수 있는 모달 창을 보여주어야 합니다.
// "취소하기" 버튼 클릭 시 모달 창이 닫혀야 합니다.
// "가입하기" 버튼 클릭 시 윈도우의 alert 창을 이용해 "가입되었습니다 🥳 " 라는 메시지를 출력해야 합니다.
const $confirmId = document.getElementById('confirm-id')
const $confirmPw = document.getElementById('confirm-pw')

$submit.addEventListener('click', (e) => {
    e.preventDefault()
    const isvalidForm =
        checkIdValidation($id.value) === true &&
        checkPwValidation($pw.value) === true &&
        checkPwCheckValidation($pwCheck.value) === true
    if (isvalidForm) {
        $confirmId.innerText = $id.value
        $confirmPw.innerText = $pw.value
        $modal.showModal()
    }
})

const $cancleBtn = document.getElementById('cancel-btn')
const $approveBtn = document.getElementById('approve-btn')

$cancleBtn.addEventListener('click', () => $modal.close())
$approveBtn.addEventListener('click', () => {
    alert('가입되었습니다 🥳 ')
    $modal.close()
})

// 5. 폰트 사이즈 조절 버튼
const $increaseFontBtn = document.getElementById('increase-font-btn')
const $decreaseFontBtn = document.getElementById('decrease-font-btn')
const $html = document.documentElement

const MAX_FONT_SIZE = 20
const MIN_FONT_SIZE = 12

const getHtmlFontSize = () => {
    return parseFloat(window.getComputedStyle($html).fontSize)
}

$increaseFontBtn.addEventListener('click', () => {
    // font size +1px
    onClickFontSizeControl('increase')

    // const nextFontSize = getHtmlFontSize() + 1
    // $html.style.fontSize = nextFontSize
    // if (nextFontSize >= MAX_FONT_SIZE) {
    //     $increaseFontBtn.disabled = true
    // }
    // if (nextFontSize > MIN_FONT_SIZE) {
    //     $decreaseFontBtn.disabled = false
    // }
})
$decreaseFontBtn.addEventListener('click', () => {
    // font size -1px
    onClickFontSizeControl('decrease')

    // const nextFontSize = getHtmlFontSize() - 1
    // $html.style.fontSize = nextFontSize
    // if (nextFontSize <= MIN_FONT_SIZE) {
    //     $decreaseFontBtn.disabled = true
    // }
    // if (nextFontSize < MAX_FONT_SIZE) {
    //     $increaseFontBtn.disabled = false
    // }
})

const onClickFontSizeControl = (flag) => {
    const fontSize = getHtmlFontSize()
    let newFontSize = flag === 'increase' ? fontSize + 1 : fontSize - 1
    $html.style.fontSize = newFontSize
    $decreaseFontBtn.disabled = newFontSize <= MIN_FONT_SIZE
    $increaseFontBtn.disabled = newFontSize >= MAX_FONT_SIZE
}
