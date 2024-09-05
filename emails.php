<?php
$response = ['success' => false, 'message' => ''];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to = 'marintech0@gmail.com'; 
    $subject = 'Nuevo mensaje de contacto';

    $email_body = "Nombre y Apellido: $name\n";
    $email_body .= "Número de Contacto: $phone\n";
    $email_body .= "Correo Electrónico: $email\n";
    $email_body .= "Mensaje:\n$message\n";

    $headers = "From: $email\n";
    $headers .= "Reply-To: $email\n";

    if (mail($to, $subject, $email_body, $headers)) {
        $response['success'] = true;
        $response['message'] = 'Mensaje enviado correctamente.';
    } else {
        $response['message'] = 'Hubo un error al enviar el mensaje. Inténtalo de nuevo.';
    }
}

echo json_encode($response);
?>