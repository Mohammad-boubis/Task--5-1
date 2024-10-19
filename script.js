const buttons = document.querySelectorAll('button');
const screen = document.querySelector('.calculator-screen');

let currentInput = ''; // سيحوي المدخل الحالي
let cursorPosition = 0; // موضع المؤشر

// دالة للحصول على موضع المؤشر
function getCaretPosition(element) {
    let position = 0;
    const range = window.getSelection().getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    position = preCaretRange.toString().length;
    return position;
}

// دالة لضبط موضع المؤشر
function setCaretPosition(element, position) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.setStart(element.firstChild, position);
    range.setEnd(element.firstChild, position);
    selection.removeAllRanges();
    selection.addRange(range);
}

// تحديث المدخلات عند إدخال المستخدم
screen.addEventListener('input', () => {
    currentInput = screen.textContent;
    cursorPosition = getCaretPosition(screen);
});

// معالجة النقرات على الأزرار
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        // الحصول على موضع المؤشر الحالي
        cursorPosition = getCaretPosition(screen);

        if (value === 'clear') {
            // مسح الشاشة
            currentInput = '';
            screen.textContent = '';
            cursorPosition = 0;
        } else if (value === 'backspace') {
            // حذف بناءً على موضع المؤشر
            if (cursorPosition > 0) {
                currentInput = currentInput.slice(0, cursorPosition - 1) + currentInput.slice(cursorPosition);
                cursorPosition -= 1;
                screen.textContent = currentInput;
            }
        } else if (value === 'sqrt') {
            // حساب الجذر التربيعي
            try {
                currentInput = Math.sqrt(eval(currentInput)).toString();
                screen.textContent = currentInput;
                cursorPosition = currentInput.length;
            } catch {
                screen.textContent = 'خطأ';
            }
        } else if (value === 'sin') {
            // حساب sin
            try {
                currentInput = Math.sin(eval(currentInput)).toString();
                screen.textContent = currentInput;
                cursorPosition = currentInput.length;
            } catch {
                screen.textContent = 'خطأ';
            }
        } else if (value === 'cos') {
            // حساب cos
            try {
                currentInput = Math.cos(eval(currentInput)).toString();
                screen.textContent = currentInput;
                cursorPosition = currentInput.length;
            } catch {
                screen.textContent = 'خطأ';
            }
        } else if (value === 'negate') {
            // تحويل الرقم إلى سالب أو موجب
            try {
                currentInput = (-1 * eval(currentInput)).toString();
                screen.textContent = currentInput;
                cursorPosition = currentInput.length;
            } catch {
                screen.textContent = 'خطأ';
            }
        } else if (value === '=') {
            // حساب الناتج النهائي
            try {
                currentInput = eval(currentInput).toString();
                screen.textContent = currentInput;
                cursorPosition = currentInput.length;
            } catch {
                screen.textContent = 'خطأ';
            }
        } else {
            // إدراج القيمة في مكان المؤشر
            currentInput = currentInput.slice(0, cursorPosition) + value + currentInput.slice(cursorPosition);
            cursorPosition += value.length;
            screen.textContent = currentInput;
        }

        // ضبط موضع المؤشر
        setCaretPosition(screen, cursorPosition);
    });
});
