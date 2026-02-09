<?php
$sent = false;

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $name    = trim($_POST['name']);
    $email   = trim($_POST['email']);
    $phone   = trim($_POST['phone']);
    $subject = trim($_POST['subject']);
    $message = trim($_POST['message']);

    // 🔴 Change this to your receiving email
    $to = "yourmail@example.com";

    $mail_subject = "New Contact Form Submission";

    $body = "
You have received a new message from your website:

Name: $name
Email: $email
Phone: $phone
Subject: $subject

Message:
$message
";

    $headers  = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $mail_subject, $body, $headers)) {
        $sent = true;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Thank You</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .thank-box {
        background: #fff;
        padding: 40px 30px;
        border-radius: 12px;
        text-align: center;
        max-width: 420px;
        width: 100%;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        animation: fadeIn 0.6s ease;
    }
    h2 {
        color: #28a745;
        margin-bottom: 10px;
    }
    p {
        color: #555;
        line-height: 1.6;
    }
    .btn {
        display: inline-block;
        margin-top: 25px;
        padding: 12px 28px;
        background: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 6px;
        transition: 0.3s;
    }
    .btn:hover {
        background: #0056b3;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>
</head>

<body>

<?php if ($sent): ?>

    <div class="thank-box">
        <h2>Thank You! 🙏</h2>
        <p>
            Thank you for contacting us.<br>
            Your message has been sent successfully.<br>
            We’ll get back to you very soon.
        </p>
        <a href="javascript:history.back()" class="btn">Go Back</a>
    </div>

<?php else: ?>

    <div class="thank-box">
        <h2>Oops 😕</h2>
        <p>Something went wrong.<br>Please try again later.</p>
        <a href="javascript:history.back()" class="btn">Go Back</a>
    </div>

<?php endif; ?>

</body>
</html>
