<?php
$sent = false;

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $name   = trim($_POST['name'] ?? '');
    $email  = trim($_POST['email'] ?? '');
    $phone  = trim($_POST['phone'] ?? '');
    $query  = trim($_POST['query'] ?? '');
    $person = trim($_POST['person'] ?? '');

    // 🔴 Change to your receiving email
    $to = "yourmail@example.com";

    $mail_subject = "New Free Quote Request";

    $body = "
New Free Quote Request Received:

Name: $name
Email: $email
Phone: $phone
Type of Query: $query
No. of Pax: $person
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
<title>Free Quote</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .box {
        background: #fff;
        padding: 40px 30px;
        border-radius: 14px;
        text-align: center;
        max-width: 480px;
        width: 100%;
        box-shadow: 0 15px 40px rgba(0,0,0,0.12);
        animation: fadeIn 0.6s ease;
    }
    h2 {
        color: #28a745;
        margin-bottom: 10px;
    }
    p {
        color: #555;
        line-height: 1.7;
        font-size: 15px;
    }
    .btn {
        display: inline-block;
        margin-top: 25px;
        padding: 12px 30px;
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
        from { opacity: 0; transform: translateY(15px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>
</head>

<body>

<?php if ($sent): ?>

    <div class="box">
        <h2>Thank You! 🙌</h2>
        <p>
            Thank you for requesting a free quote.<br>
            Our team has received your details and<br>
            will contact you shortly with the best offer.
        </p>
        <a href="javascript:history.back()" class="btn">Go Back</a>
    </div>

<?php else: ?>

    <div class="box">
        <h2>Oops 😕</h2>
        <p>
            Something went wrong while submitting your request.<br>
            Please try again.
        </p>
        <a href="javascript:history.back()" class="btn">Go Back</a>
    </div>

<?php endif; ?>

</body>
</html>
