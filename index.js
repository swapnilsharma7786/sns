const aws = require('aws-sdk');
const request = require('request');
const config = require('../config');

aws.config.update({
    secretAccessKey: config.AWS_SECRET_KEY,
    accessKeyId: config.AWS_ACCESS_KEY,
    region: config.AWS_REGION
});

const sns = new aws.SNS({apiVersion: config.AWS_API_VERSION});

/**
 * @description create a SNS Topic
 * @param {String} topicName Name of the topic
 * @returns {String} Name of the Topic arn
 */
function createSNSTopic(topicName) {
    sns.createTopic({Name: topicName}, (err, resp) => {
        if (err) {
            console.log("Error: createSNSTopic", err, topicName);
            return err;
        }
        console.log("SNS Topic Created", topicName, resp.TopicArn);
        return resp.TopicArn;
    });
}

/**
 * @description get all SNS Topics
 * @returns {Object} Array of Topics with TopicArn attributes
 */
function getAllSNSTopics() {
    sns.listTopics({}, (err, resp) => {
        if (err) {
            console.log("Error: getAllSNSTopics", err);
            return err;
        }
        console.log("SNS Topics", resp.Topics);
        return resp.Topics;
    });
}

/**
 * @description delete a SNS Topic
 * @param {String} topicArn AWS arn name of the topic 
 */
function deletSNSTopic(topicArn) {
    sns.deleteTopic({TopicArn: topicArn}, err => {
        if (err) {
            console.log("Error: deletSNSTopic", err, topicArn);
            return err;
        }
        console.log("SNS Topic Deleted", topicArn);
        return;
    });
}

/**
 * @description set SNS Topic Attribute
 * @param {String} topicArn AWS arn name of the topic 
 * @param {String} attributeName Name of the attribute
 * @param {String} attributeValue Value of the attribute
 */
function setSNSTopicAttributes(topicArn, attributeName, attributeValue) {
    const params = {
        TopicArn: topicArn,
        AttributeName: attributeName,
        AttributeValue: attributeValue
    };
    sns.setTopicAttributes(params, (err, resp) => {
        if (err) {
            console.log("Error: setSNSTopicAttributes", err, topicArn);
            return err;
        }
        console.log("SNS Topic Attributes updated", topicArn);
        return;
    });
}

/**
 * @description get SNS Topic Attributes
 * @param {String} topicArn AWS arn name of the topic
 * @returns {Object} { Policy ; {} , Owner: '', SubscriptionsPending: '', TopicArn: '', EffectiveDeliveryPolicy: {}, SubscriptionsConfirmed: '', DisplayName: '', SubscriptionsDeleted: ''  
 */
function getSNSTopicAttributes(topicArn) {
    sns.getTopicAttributes({TopicArn: topicArn}, (err, resp) => {
        if (err) {
            console.log("Error: getSNSTopicAttributes", err, topicArn);
            return err;
        }
        console.log("SNS Topic Attributes", topicArn, resp);
        return resp;
    });
}

/**
 * @description get all Subscriptions for a particular Topic
 * @param {String} topicArn AWS arn name of the topic 
 * @returns {Object} array of objects having attributes { SubscriptionArn: 'PendingConfirmation', Owner: '', Protocol: '', Endpoint: '', TopicArn: '' }
 */
function getSubscriptionsByTopic(topicArn) {
    sns.listSubscriptionsByTopic({TopicArn: topicArn}, (err, resp) => {
        if (err) {
            console.log("Error: getSubscriptionsByTopic", err, topicArn);
            return err;
        }
        console.log("SNS Subscriptions for Topic", topicArn, resp);
        return resp;
    });
}

/**
 * @description create subscription for a Topic
 * @param {String} topicArn AWS arn name of the topic 
 * @param {String} protocol HTTP, HTTPS, Email, Email-JSON, Amazon SQS, AWS Lambda, etc.
 * @param {String} endPoint API url, email address, lambda function arn, etc.
 */
function createSNSTopicSubscription(topicArn, protocol, endPoint) {
    const params = {
        Protocol: protocol,
        TopicArn: topicArn,
        Endpoint: endPoint
    };
    sns.subscribe(params, (err, resp) => {
        if (err) {
            console.log("Error: createSNSTopicSubscription", err, topicArn);
            return err;
        }
        console.log("SNS Topic Subscription created", topicArn, resp);
        return resp;
    });
}

/**
 * @description confirm the subscription for https protocol
 * @param {String} subscriptionUrl Subscription url
 */
function confirmSNSTopicSubscription(subscriptionUrl) {
    request(subscriptionUrl, err => {
        if (err) {
            console.log("Error: confirmSNSTopicSubscription", err, subscriptionUrl);
            return err;
        }
        console.log("SNS Topic Subscription confirmed", subscriptionUrl);
        return;
    });
}

/**
 * @description unsubscribe subscription from a Topic
 * @param {String} subscriptionArn Subscription url
 */
function unSubscribeFromTopic(subscriptionArn) {
    sns.unsubscribe({SubscriptionArn: subscriptionArn}, err => {
        if (err) {
            console.log("Error: unSubscribeFromTopic", err);
            return err;
        }
        console.log("SNS Topic Unsubscribed");
        return;
    });
}

/**
 * @description Publish message to Topic
 * @param {String} topicArn AWS arn of the topic
 * @param {String} message Message Body
 */
function publishMessageToSNSTopic(topicArn, message) {
    const params = {
        Message: message,
        TopicArn: topicArn
    };
    sns.publish(params, (err, resp) => {
        if (err) {
            console.log("Error: publishMessageToSNSTopic", err, topicArn);
            return err;
        }
        console.log("Message published to SNS Topic", topicArn, resp);
        return resp;
    });
}

module.exports = {
    createSNSTopic,
    getAllSNSTopics,
    deletSNSTopic,
    setSNSTopicAttributes,
    getSNSTopicAttributes,
    getSubscriptionsByTopic,
    createSNSTopicSubscription,
    confirmSNSTopicSubscription,
    unSubscribeFromTopic,
    publishMessageToSNSTopic
};
