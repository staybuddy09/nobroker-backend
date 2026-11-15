async function testOtp() {
  try {
    console.log("⏳ OTP bhejne ki koshish kar raha hoon...");
    const res = await fetch('https://nobroker-api.onrender.com/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'staybuddy09@gmail.com' }) // 👈 YAHAN APNA EMAIL DAALO
    });
    
    const data = await res.json();
    console.log("✅ Backend Response:", data);
  } catch (error) {
    console.log("❌ Error:", error.message);
  }
}

testOtp();