html_code = '''<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <title>Executive Car Service</title>  
    <style>  
        /* 基础样式重置 */  
        * {  
            margin: 0;  
            padding: 0;  
            box-sizing: border-box;  
        }  
          
        /* 响应式字体 */  
        body {  
            font-family: 'Helvetica Neue', Arial, sans-serif;  
            line-height: 1.6;  
            color: #333;  
            background-color: #f8f9fa;  
        }  
          
        /* 顶部标题栏 */  
        .header {  
            background: linear-gradient(135deg, #1a2a6c, #2c3e50);  
            color: white;  
            padding: 1.2rem 1rem;  
            text-align: center;  
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);  
            position: sticky;  
            top: 0;  
            z-index: 100;  
        }  
          
        /* 海报容器 - 带蒙版效果 */  
        .hero-container {  
            position: relative;  
            margin: 20px 0;  
            height: 400px;  
            overflow: hidden;  
        }  
          
        .hero-image {  
            width: 100%;  
            height: 100%;  
            object-fit: cover;  
            object-position: center;  
        }  
          
        .hero-overlay {  
            position: absolute;  
            top: 0;  
            left: 0;  
            width: 100%;  
            height: 100%;  
            background: rgba(0, 0, 0, 0.5); /* 黑色蒙版 */  
            display: flex;  
            flex-direction: column;  
            justify-content: center;  
            align-items: center;  
            color: white;  
            text-align: center;  
            padding: 20px;  
        }  
          
        .hero-overlay h2 {  
            font-size: 2rem;  
            margin-bottom: 20px;  
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);  
        }  
          
        .hero-overlay p {  
            font-size: 1.2rem;  
            max-width: 600px;  
            margin-bottom: 30px;  
            text-shadow: 0 1px 3px rgba(0,0,0,0.5);  
        }  
          
        /* 预约按钮 - 悬停动画 */  
        .booking-btn {  
            background: linear-gradient(to right, #3498db, #2c3e50); /* 蓝底渐变 */  
            color: white; /* 白字 */  
            padding: 16px 32px;  
            border: none;  
            border-radius: 50px;  
            font-size: 1.1rem;  
            font-weight: 600;  
            cursor: pointer;  
            transition: all 0.4s ease;  
            margin: 20px auto;  
            display: block;  
            width: 100%;  
            max-width: 300px;  
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);  
        }  
          
        .booking-btn:hover {  
            transform: translateY(-3px);  
            box-shadow: 0 7px 20px rgba(0,0,0,0.25);  
        }  
          
        /* 二级页面样式 */  
        .booking-page {  
            display: none;  
            padding: 20px;  
            opacity: 0;  
            transform: scale(0.9);  
            transition: all 0.5s ease;  
        }  
          
        .booking-page.active {  
            display: block;  
            opacity: 1;  
            transform: scale(1);  
        }  
          
        .form-group {  
            margin-bottom: 20px;  
            position: relative;  
        }  
          
        label {  
            display: block;  
            margin-bottom: 8px;  
            font-weight: 500;  
            color: #2c3e50;  
        }  
          
        input, select {  
            width: 100%;  
            padding: 12px;  
            border: 1px solid #ddd;  
            border-radius: 8px;  
            font-size: 1rem;  
            transition: all 0.3s ease;  
        }  
          
        input:focus, select:focus {  
            border-color: #3498db;  
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);  
        }  
          
        .error {  
            border-color: #e74c3c !important;  
            animation: shake 0.5s;  
        }  
          
        @keyframes shake {  
            0%, 100% {transform: translateX(0);}  
            20%, 60% {transform: translateX(-5px);}  
            40%, 80% {transform: translateX(5px);}  
        }  
          
        .error-text {  
            color: #e74c3c;  
            font-size: 0.85rem;  
            margin-top: 5px;  
            display: none;  
        }  
          
        .time-picker {  
            display: flex;  
            gap: 10px;  
        }  
          
        .time-picker select {  
            flex: 1;  
        }  
          
        /* 弹窗样式 */  
        .modal {  
            display: none;  
            position: fixed;  
            top: 0;  
            left: 0;  
            width: 100%;  
            height: 100%;  
            background: rgba(0,0,0,0.7);  
            z-index: 1000;  
            justify-content: center;  
            align-items: center;  
        }  
          
        .modal-content {  
            background: white;  
            padding: 30px;  
            border-radius: 12px;  
            width: 90%;  
            max-width: 400px;  
            text-align: center;  
            animation: scaleIn 0.3s ease-out;  
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);  
        }  
          
        @keyframes scaleIn {  
            from { transform: scale(0.8); opacity: 0; }  
            to { transform: scale(1); opacity: 1; }  
        }  
          
        .close-modal {  
            background: #e74c3c;  
            color: white;  
            border: none;  
            padding: 10px 20px;  
            border-radius: 5px;  
            cursor: pointer;  
            margin-top: 20px;  
        }  
          
        /* 机场选择样式 */  
        .airport-select {  
            position: absolute;  
            top: 100%;  
            left: 0;  
            width: 100%;  
            background: white;  
            border: 1px solid #ddd;  
            border-radius: 8px;  
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);  
            max-height: 200px;  
            overflow-y: auto;  
            z-index: 100;  
            display: none;  
        }  
          
        .airport-option {  
            padding: 10px 12px;  
            cursor: pointer;  
            transition: all 0.2s;  
        }  
          
        .airport-option:hover {  
            background: #f1f8ff;  
        }  
          
        /* 底部联系信息 */  
        .footer {  
            background: #f8f9fa;  
            padding: 30px 20px;  
            text-align: center;  
            border-top: 1px solid #eee;  
        }  
          
        .footer-content {  
            display: flex;  
            flex-direction: column;  
            align-items: center;  
            gap: 20px;  
        }  
          
        .qr-codes {  
            display: flex;  
            justify-content: center;  
            gap: 20px;  
            width: 100%;  
        }  
          
        .qr-code {  
            width: 120px;  
            height: 120px;  
            border: 1px solid #eee;  
            padding: 5px;  
            border-radius: 8px;  
        }  
          
        .contact-info {  
            display: flex;  
            flex-direction: column;  
            gap: 10px;  
            width: 100%;  
        }  
          
        .contact-item {  
            display: flex;  
            align-items: center;  
            justify-content: center;  
            gap: 10px;  
        }  
          
        .contact-item img {  
            width: 24px;  
            height: 24px;  
        }  
          
        /* 按钮容器 */  
        .button-container {  
            display: flex;  
            gap: 15px;  
            margin-top: 30px;  
            justify-content: flex-end;  
        }  
          
        .booking-btn-tertiary {  
            background: linear-gradient(to right, #3498db, #2c3e50);  
            flex: 1; /* 查看费用按钮宽度较小 */  
        }  
          
        .booking-btn-secondary {  
            background: linear-gradient(to right, #27ae60, #2ecc71); /* 预约打车按钮绿色渐变 */  
            flex: 2; /* 预约打车按钮宽度更大 */  
        }  
    </style>  
</head>  
<body>  
    <!-- 首页 -->  
    <div class="header">  
        <h1>Executive Car Service</h1>  
    </div>  
  
    <div class="hero-container">  
        <img src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect fill='%231a2a6c' width='800' height='400'/%3E%3Ctext fill='%23ffffff' font-family='Arial' font-size='40' text-anchor='middle' x='400' y='220'%3ELuxury Executive Car%3C/text%3E%3C/svg%3E" alt="Luxury Executive Car" class="hero-image">  
        <div class="hero-overlay" id="heroOverlay">  
            <h2>Exclusive Travel Experience</h2>  
            <p>Our executive car service provides top-level comfort, 24/7 professional drivers to meet your business travel, airport transfers, city tours and other needs.</p>  
            <button class="booking-btn" onclick="showBookingPage()">Book Now</button>  
        </div>  
    </div>  
  
    <!-- 底部联系信息 -->  
    <div class="footer">  
        <div class="footer-content">  
            <div class="qr-codes">  
                <div class="qr-code">  
                    <img src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect fill='%232c3e50' width='120' height='120'/%3E%3Ctext fill='%23ffffff' font-family='Arial' font-size='16' text-anchor='middle' dominant-baseline='middle'%3EWeChat%3C/text%3E%3C/svg%3E" alt="WeChat QR Code">  
                </div>  
                <div class="qr-code">  
                    <img src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect fill='%231a2a6c' width='120' height='120'/%3E%3Ctext fill='%23ffffff' font-family='Arial' font-size='16' text-anchor='middle' dominant-baseline='middle'%3EAlipay%3C/text%3E%3C/svg%3E" alt="Alipay QR Code">  
                </div>  
            </div>  
            <div class="contact-info">  
                <div class="contact-item">  
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">  
                        <path d="M21.5 12.5V15C21.5 17.1333 21.0524 18.6893 20.1561 19.6686C19.2598 20.6478 18.0397 21.125 16.5 21.125H7.5C5.96026 21.125 4.74016 20.6478 3.84389 19.6686C2.94761 18.6893 2.5 17.1333 2.5 15V12.5" stroke="#2c3e50" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>  
                        <path d="M15.9289 2.62891C16.8196 1.73826 18.2342 1.73826 19.1249 2.62891C20.0155 3.51956 20.0155 4.93417 19.1249 5.82482L15.1249 9.82482C14.2342 10.7155 12.8196 10.7155 11.9289 9.82482C11.0383 8.93417 11.0383 7.51956 11.9289 6.62891L15.9289 2.62891Z" stroke="#2c3e50" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>  
                        <path d="M2.5 15.625H6.5" stroke="#2c3e50" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>  
                    </svg>  
                    <span>Tel: 400-123-4567</span>  
                </div>  
                <div class="contact-item">  
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">  
                        <path d="M4 7.5C4 6.11878 5.11878 5 6.5 5H17.5C18.8812 5 20 6.11878 20 7.5V16.5C20 17.8812 18.8812 19 17.5 19H6.5C5.11878 19 4 17.8812 4 16.5V7.5Z" stroke="#2c3e50" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>  
                        <path d="M4 8.5L12 13.5L20 8.5" stroke="#2c3e50" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>  
                    </svg>  
                    <span>Email: service@executivecar.com</span>  
                </div>  
            </div>  
        </div>  
    </div>  
  
    <!-- 二级页面 -->  
    <div class="booking-page" id="bookingPage">  
        <h2 style="text-align: center; margin-bottom: 30px; color: #2c3e50;">Booking Service</h2>  
          
        <div class="form-group">  
            <label for="serviceType">Service Type</label>  
            <select id="serviceType" required>  
                <option value="" disabled selected>Select Service Type</option>  
                <option>Airport Transfer</option>  
                <option>Business Travel</option>  
                <option>City Tour</option>  
                <option>Long-distance Charter</option>  
            </select>  
            <div class="error-text" id="serviceTypeError">Please select service type</div>  
        </div>  
  
        <div class="form-group">  
            <label for="passengers">Number of Passengers</label>  
            <input type="number" id="passengers" min="1" max="6" value="1" required>  
            <div class="error-text" id="passengersError">Please enter number of passengers</div>  
        </div>  
  
        <div class="form-group">  
            <label>Travel Time</label>  
            <div class="time-picker">  
                <select id="date" required></select>  
                <select id="time" required></select>  
            </div>  
            <div class="error-text" id="datetimeError">Please select travel time</div>  
        </div>  
  
        <div class="form-group">  
            <label for="from">Departure</label>  
            <input type="text" id="from" placeholder="Enter departure address" required>  
            <div class="error-text" id="fromError">Please enter departure</div>  
        </div>  
  
        <div class="form-group">  
            <label for="to">Destination</label>  
            <div style="position: relative;">  
                <input type="text" id="to" placeholder="Enter destination address" readonly required>  
                <button type="button" id="toggleAirportList" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #2c3e50; font-size: 1.2rem; display: none;">▼</button>  
            </div>  
            <div class="airport-select" id="airportSelect">  
                <div class="airport-option" data-value="Beijing Capital International Airport">Beijing Capital International Airport</div>  
                <div class="airport-option" data-value="Shanghai Pudong International Airport">Shanghai Pudong International Airport</div>  
                <div class="airport-option" data-value="Guangzhou Baiyun International Airport">Guangzhou Baiyun International Airport</div>  
                <div class="airport-option" data-value="Shenzhen Bao'an International Airport">Shenzhen Bao'an International Airport</div>  
                <div class="airport-option" data-value="Chengdu Shuangliu International Airport">Chengdu Shuangliu International Airport</div>  
            </div>  
            <div class="error-text" id="toError">Please enter destination</div>  
        </div>  
  
        <div class="form-group">  
            <label for="phone">Phone Number</label>  
            <input type="tel" id="phone" placeholder="Enter your phone number" required>  
            <div class="error-text" id="phoneError">Please enter phone number</div>  
        </div>  
  
        <div class="button-container">  
            <button class="booking-btn booking-btn-tertiary" onclick="showCostModal()">View Cost</button>  
            <button class="booking-btn booking-btn-secondary" onclick="submitBooking()">Confirm Booking</button>  
        </div>  
    </div>  
  
    <!-- 费用弹窗 -->  
    <div class="modal" id="costModal">  
        <div class="modal-content">  
            <h3 id="costDisplay">Cost: $0</h3>  
            <p style="margin: 15px 0; color: #7f8c8d;">Rate: $5 per mile, system will calculate travel distance automatically</p>  
            <button class="booking-btn" style="background: #27ae60; margin-top: 20px;" onclick="confirmBooking()">Confirm Booking</button>  
            <button class="close-modal" onclick="closeModal()">Close</button>  
        </div>  
    </div>  
  
    <!-- 预约成功弹窗 -->  
    <div class="modal" id="successModal">  
        <div class="modal-content">  
            <h3 style="color: #27ae60;">? Booking Successful!</h3>  
            <p style="margin: 15px 0;">Our customer service will contact you within 5 minutes to confirm trip details</p>  
            <button class="booking-btn" style="background: #27ae60; margin-top: 20px;" onclick="closeSuccessModal()">Confirm</button>  
        </div>  
    </div>  
  
    <script>  
        // 全局变量跟踪当前验证类型  
        let currentValidationType = null;  
          
        // 表单验证函数  
        function validateForm(validationType) {  
            currentValidationType = validationType;  
            let isValid = true;  
            const serviceType = document.getElementById('serviceType');  
            const passengers = document.getElementById('passengers');  
            const date = document.getElementById('date');  
            const time = document.getElementById('time');  
            const from = document.getElementById('from');  
            const to = document.getElementById('to');  
            const phone = document.getElementById('phone');  
              
            // 重置错误状态  
            resetErrors();  
              
            // 验证服务类型  
            if (!serviceType.value) {  
                serviceType.classList.add('error');  
                document.getElementById('serviceTypeError').style.display = 'block';  
                isValid = false;  
                scrollToElement(serviceType);  
            }  
              
            // 验证乘车人数  
            if (!passengers.value) {  
                passengers.classList.add('error');  
                document.getElementById('passengersError').style.display = 'block';  
                isValid = false;  
                scrollToElement(passengers);  
            }  
              
            // 验证乘车时间  
            if (!date.value || !time.value) {  
                document.getElementById('datetimeError').style.display = 'block';  
                isValid = false;  
                scrollToElement(date);  
            }  
              
            // 验证出发地  
            if (!from.value) {  
                from.classList.add('error');  
                document.getElementById('fromError').style.display = 'block';  
                isValid = false;  
                scrollToElement(from);  
            }  
              
            // 验证到达地  
            if (!to.value) {  
                to.classList.add('error');  
                document.getElementById('toError').style.display = 'block';  
                isValid = false;  
                scrollToElement(to);  
            }  
              
            // 验证电话号码  
            if (!phone.value) {  
                phone.classList.add('error');  
                document.getElementById('phoneError').style.display = 'block';  
                isValid = false;  
                scrollToElement(phone);  
            }  
              
            return isValid;  
        }  
          
        // 重置错误状态  
        function resetErrors() {  
            const errorFields = document.querySelectorAll('.error, .error-text');  
            errorFields.forEach(field => {  
                field.classList.remove('error');  
                if (field.tagName === 'DIV' && field.classList.contains('error-text')) {  
                    field.style.display = 'none';  
                }  
            });  
        }  
          
        // 滚动到指定元素  
        function scrollToElement(element) {  
            element.scrollIntoView({behavior: 'smooth', block: 'center'});  
        }  
          
        // 显示二级页面  
        function showBookingPage() {  
            // 隐藏首页的海报容器和底部联系信息  
            document.querySelector('.hero-container').style.display = 'none';  
            document.querySelector('.footer').style.display = 'none';  
            // 显示二级页面  
            document.getElementById('bookingPage').classList.add('active');  
        }  
          
        // 初始化服务类型监听  
        function initServiceTypeListener() {  
            const serviceType = document.getElementById('serviceType');  
            const toInput = document.getElementById('to');  
            const airportSelect = document.getElementById('airportSelect');  
            const toggleButton = document.getElementById('toggleAirportList');  
              
            serviceType.addEventListener('change', function() {  
                if (this.value === 'Airport Transfer') {  
                    // 显示机场选择列表  
                    airportSelect.style.display = 'block';  
                    toggleButton.style.display = 'block';  
                    toInput.readOnly = true;  
                    toInput.placeholder = 'Select Airport';  
                } else {  
                    // 隐藏机场选择列表  
                    airportSelect.style.display = 'none';  
                    toggleButton.style.display = 'none';  
                    toInput.readOnly = false;  
                    toInput.placeholder = 'Enter destination address';  
                }  
            });  
              
            // 触发一次change事件以初始化  
            const event = new Event('change');  
            serviceType.dispatchEvent(event);  
        }  
          
        // 初始化输入监听  
        function initInputListeners() {  
            const fromInput = document.getElementById('from');  
            const toInput = document.getElementById('to');  
            const phoneInput = document.getElementById('phone');  
              
            // 出发地输入监听  
            fromInput.addEventListener('input', function() {  
                if (this.value) {  
                    document.getElementById('fromError').style.display = 'none';  
                    this.classList.remove('error');  
                }  
            });  
              
            // 到达地输入监听  
            toInput.addEventListener('input', function() {  
                if (this.value) {  
                    document.getElementById('toError').style.display = 'none';  
                    this.classList.remove('error');  
                }  
            });  
              
            // 电话号码输入监听  
            phoneInput.addEventListener('input', function() {  
                if (this.value) {  
                    document.getElementById('phoneError').style.display = 'none';  
                    this.classList.remove('error');  
                }  
            });  
        }  
          
        // 初始化机场列表切换按钮  
        function initAirportListToggle() {  
            const toggleButton = document.getElementById('toggleAirportList');  
            const airportSelect = document.getElementById('airportSelect');  
              
            toggleButton.addEventListener('click', function() {  
                if (airportSelect.style.display === 'block') {  
                    airportSelect.style.display = 'none';  
                    this.innerHTML = '▼';  
                } else {  
                    airportSelect.style.display = 'block';  
                    this.innerHTML = '▲';  
                }  
            });  
              
            // 添加机场选项点击事件  
            document.querySelectorAll('.airport-option').forEach(option => {  
                option.addEventListener('click', function() {  
                    document.getElementById('to').value = this.dataset.value;  
                    airportSelect.style.display = 'none';  
                    toggleButton.innerHTML = '▼';  
                });  
            });  
        }  
          
        // 生成日期时间选项  
        function generateDateTimeOptions() {  
            const dateSelect = document.getElementById('date');  
            const timeSelect = document.getElementById('time');  
              
            // 生成未来7天的日期  
            const today = new Date();  
            for (let i = 0; i < 7; i++) {  
                const date = new Date();  
                date.setDate(today.getDate() + i);  
                const option = document.createElement('option');  
                option.value = date.toISOString().split('T')[0];  
                option.textContent = `${date.toLocaleDateString()} ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][date.getDay()]}`;  
                dateSelect.appendChild(option);  
            }  
  
            // 生成时间选项（每15分钟）  
            for (let hour = 0; hour < 24; hour++) {  
                for (let min = 0; min < 60; min += 15) {  
                    const option = document.createElement('option');  
                    option.value = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;  
                    option.textContent = option.value;  
                    timeSelect.appendChild(option);  
                }  
            }  
              
            // 设置默认值  
            dateSelect.value = today.toISOString().split('T')[0];  
            const now = new Date();  
            const hour = now.getHours();  
            const min = Math.floor(now.getMinutes() / 15) * 15;  
            timeSelect.value = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;  
        }  
          
        // 显示费用弹窗  
        function showCostModal() {  
            if (validateForm(false)) {  
                // 简单模拟距离计算（实际应接入地图API计算实际距离）  
                const distance = Math.floor(Math.random() * 20) + 1;  
                const cost = distance * 5;  
                document.getElementById('costDisplay').textContent = `Cost: $${cost} (${distance} miles x $5/mile)`;  
                document.getElementById('costModal').style.display = 'flex';  
            }  
        }  
          
        // 关闭弹窗  
        function closeModal() {  
            document.getElementById('costModal').style.display = 'none';  
        }  
          
        // 关闭成功弹窗  
        function closeSuccessModal() {  
            document.getElementById('successModal').style.display = 'none';  
            // 返回首页  
            document.getElementById('bookingPage').classList.remove('active');  
            document.querySelector('.hero-container').style.display = 'block';  
            document.querySelector('.footer').style.display = 'block';  
              
            // 重置表单  
            document.getElementById('serviceType').value = '';  
            document.getElementById('passengers').value = '1';  
            document.getElementById('from').value = '';  
            document.getElementById('to').value = '';  
            document.getElementById('phone').value = '';  
        }  
          
        // 提交预约  
        function submitBooking() {  
            if (validateForm(true)) {  
                // 直接提交预约，不需要显示费用弹窗  
                document.getElementById('successModal').style.display = 'flex';  
            }  
        }  
          
        // 确认预约（保留）  
        function confirmBooking() {  
            closeModal();  
            submitBooking();  
        }  
          
        // 页面加载完成后执行  
        window.onload = function() {  
            // 生成日期时间选项  
            generateDateTimeOptions();  
              
            // 初始化服务类型监听  
            initServiceTypeListener();  
              
            // 初始化输入监听  
            initInputListeners();  
              
            // 初始化机场列表切换按钮  
            initAirportListToggle();  
        };  
    </script>  
</body>  
</html>'''  
  
