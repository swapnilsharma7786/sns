# sns
Push Notification through SNS, configure topic, publish notifications

**createSNSTopic**
create a SNS Topic

createSNSTopic(topicName: String): String
Parameters
topicName (String) Name of the topic
Returns
String: Name of the Topic arn

**getAllSNSTopics**
get all SNS Topics

getAllSNSTopics(): Object
Returns
Object: Array of Topics with TopicArn attributes

**deletSNSTopic**
delete a SNS Topic

deletSNSTopic(topicArn: String)
Parameters
topicArn (String) AWS arn name of the topic

**setSNSTopicAttributes**
set SNS Topic Attribute

setSNSTopicAttributes(topicArn: String, attributeName: String, attributeValue: String)
Parameters
topicArn (String) AWS arn name of the topic
attributeName (String) Name of the attribute
attributeValue (String) Value of the attribute

**getSNSTopicAttributes**
get SNS Topic Attributes

getSNSTopicAttributes(topicArn: String): Object
Parameters
topicArn (String) AWS arn name of the topic
Returns
Object: { Policy ; {} , Owner: '', SubscriptionsPending: '', TopicArn: '', EffectiveDeliveryPolicy: {}, SubscriptionsConfirmed: '', DisplayName: '', SubscriptionsDeleted: ''

**getSubscriptionsByTopic**
get all Subscriptions for a particular Topic

getSubscriptionsByTopic(topicArn: String): Object
Parameters
topicArn (String) AWS arn name of the topic
Returns
Object: array of objects having attributes { SubscriptionArn: 'PendingConfirmation', Owner: '', Protocol: '', Endpoint: '', TopicArn: '' }

**createSNSTopicSubscription**
create subscription for a Topic

createSNSTopicSubscription(topicArn: String, protocol: String, endPoint: String)
Parameters
topicArn (String) AWS arn name of the topic
protocol (String) HTTP, HTTPS, Email, Email-JSON, Amazon SQS, AWS Lambda, etc.
endPoint (String) API url, email address, lambda function arn, etc.

**confirmSNSTopicSubscription**
confirm the subscription for https protocol

confirmSNSTopicSubscription(subscriptionUrl: String)
Parameters
subscriptionUrl (String) Subscription url

**unSubscribeFromTopic**
unsubscribe subscription from a Topic

unSubscribeFromTopic(subscriptionArn: String)
Parameters
subscriptionArn (String) Subscription url

**publishMessageToSNSTopic**
Publish message to Topic

publishMessageToSNSTopic(topicArn: String, message: String)
Parameters
topicArn (String) AWS arn of the topic
message (String) Message Body
