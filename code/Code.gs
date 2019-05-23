/**
 * Responds to a MESSAGE event in Hangouts Chat.
 *
 * @param (event) the event object from Hangouts Chat
 */
function onMessage(event) {

    // Guggy request header
    var body = JSON.stringify({
        "sentence": event.message.argumentText,
        "lang": "en"
    });

    // Authorization from guggy.com
    var headers = {
        "Content-Type": "application/json",
        "apiKey": "OKIE_DOKIE"
    };

    var request = {
        "method": "post",
        "headers": headers,
        "contentType": "application/json",
        "payload": body
    };

    var response = JSON.parse(UrlFetchApp.fetch("https://text2gif.guggy.com/v2/guggify", request).getContentText());
    var random_pick = Math.floor(Math.random() * 5) + 1;

    return {
        "cards": [{
            "sections": [{
                "widgets": [{
                    "image": {
                        "imageUrl": response.animated[random_pick].gif.hires.url
                    }
                }]
            }]
        }]
    };
}


/**
 * Responds to an ADDED_TO_SPACE event in Hangouts Chat.
 *
 * @param (Object) event the event object from Hangouts Chat
 */
function onAddToSpace(event) {

    var human = "Humans";
    var init_msg = `Surprise surprise! 👋 <br><br>" + human + ", I don't always make
                    sense, so be careful with your words! :P <br><br>Feedbacks/bugs
                    are welcomed at ytale@redhat.com.<br><br><b>Terms and Conditions
                    agreement</b><br>https://guggy.com/privacy.html`

    if (event.space.type == "DM") {
        human = "Human";
    }

    // Stackdriver logging
    console.info(event);

    var response = {
        "cards": [{
            "sections": [{
                "widgets": [{
                    "textParagraph": {
                        "text": init_msg
                      }
                }]
            }]
        }]
    };
    return response;
}

/**
 * Responds to a REMOVED_FROM_SPACE event in Hangouts Chat.
 *
 * @param (Object) event the event object from Hangouts Chat
 */
function onRemoveFromSpace(event) {

    // Stackdriver logging
    console.info(event);
}
