package studentportal.util;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendingEmail {

	public static void sendMail(String newUserEmail, String collegeEmail,String password) throws MessagingException {

		Properties properties = new Properties();

		properties.put("mail.smtp.auth", true);
		properties.put("mail.smtp.host", "smtp.gmail.com");
		properties.put("mail.smtp.port", 587);
		properties.put("mail.smtp.starttls.enable", true);
		properties.put("mail.transport.protocl", "smtp");

		String sendingEmail = System.getenv("2108_EMAIL");
		String myPassword = System.getenv("2108_PASSWORD");
		
		Session session = Session.getInstance(properties, new Authenticator() {

			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(sendingEmail, myPassword);
			}
		});
		Message message = prepareMessage(session, sendingEmail, newUserEmail, collegeEmail, password);

		Transport.send(message);
	}

	private static Message prepareMessage(Session session, String sendingEmail, String newUserEmail, String collegeEmail, String password) {

		try {
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(sendingEmail));
			message.setRecipient(Message.RecipientType.TO, new InternetAddress(newUserEmail));
			message.setSubject("College Name: Welcome!");
			String html = "<h1>Hello, Welcome to our College!</h1>\r\n"
					+ "<hr />\r\n"
					+ "<h4>Below is your provided university login information:</h4>\r\n"
					+ "<p>College Email:"+collegeEmail+"</p>\r\n"
					+ "<p>Password:"+password+"</p>";
			message.setContent(html, "text/html");
			return message;

		} catch (Exception e) {
			System.out.println(e);
		}
		return null;
	}

}
