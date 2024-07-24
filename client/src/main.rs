use std::process::Command;
use std::str;
use tokio;
use tokio_tungstenite::connect_async;
use futures_util::{StreamExt, SinkExt};
use tokio_tungstenite::tungstenite::protocol::Message;

#[tokio::main]
async fn main() {
    // The WebSocket server URL
    let url = "ws://localhost:5000";

    // Connect to the WebSocket server
    let (ws_stream, _) = connect_async(url)
        .await
        .expect("Failed to connect");

    println!("Connected to the WebSocket server!");

    // Split the WebSocket stream into a sender and receiver
    let (mut ws_sender, mut ws_receiver) = ws_stream.split();

    // Send a message
    let message = "Hello, WebSocket!";
    ws_sender
        .send(Message::Text(message.to_string()))
        .await
        .expect("Failed to send message");

    println!("Sent: {}", message);

    // Receive messages
    while let Some(message) = ws_receiver.next().await {
        match message {
            Ok(Message::Text(raw_command)) => {
                println!("{:?}", raw_command);

                if !raw_command.starts_with("command:") {
                    continue;
                }

                let raw_command = raw_command.replace("command:", "");
                let mut parts = raw_command.split_whitespace();
                let command = parts.next().unwrap_or("");
                let args: Vec<&str> = parts.collect();

                println!("{:?} -> skjdflk", command);
                println!("{:?}", args);

                if command.len() <= 0 {
                    continue;
                }

                println!("{:?}", command);
                
                let output = Command::new(command)
                    .args(&args)
                    .output();
                
                match output {
                    Ok(output) => {
                        // Convert the command's stdout to a string
                        let stdout = str::from_utf8(&output.stdout).unwrap_or("Failed to parse stdout");
                        let stderr = str::from_utf8(&output.stderr).unwrap_or("Failed to parse stderr");
            
                        ws_sender.send(Message::Text(format!("command_result:{stdout} {stderr}").to_string()))
                        .await
                        .expect("msgsldjfksd");
                    }
                    Err(e) => {
                        ws_sender.send(Message::Text(format!("command_result:{e}").to_string()))
                        .await
                        .expect("msgsldjfksd");
                    }
                }

                eprintln!("Failed to execute shutdown command: {}", "status");
            }
            Ok(Message::Binary(_)) => {
                println!("Received binary message");
            }
            Ok(Message::Close(_)) => {
                println!("Connection closed");
                break; // Exit the loop if the connection is closed
            }
            Ok(Message::Ping(ping)) => {
                println!("Received Ping: {:?}", ping);
            }
            Ok(Message::Pong(pong)) => {
                println!("Received Pong: {:?}", pong);
            }
            Err(e) => {
                eprintln!("Error: {}", e);
                break; // Exit the loop on error
            }
            _ => {} // Handle other message types if necessary
        }
    }
}
