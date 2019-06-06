import re
import tweepy
import os
from tweepy import OAuthHandler
from textblob import TextBlob
from dotenv import load_dotenv

load_dotenv('./server/data/.env')

class TwitterClient(object):

    def __init__(self):

        consumer_key = os.getenv('API_KEY')
        consumer_secret_key = os.getenv('API_SECRET_KEY')
        access_token = os.getenv('ACCESS_TOKEN')
        access_token_secret = os.getenv('ACCESS_TOKEN_SECRET')

        try:
            self.auth = tweepy.OAuthHandler(consumer_key, consumer_secret_key)
            self.auth.set_access_token(access_token, access_token_secret)
            self.api = tweepy.API(self.auth)
        except:
            print("Authentication failed")

    def clean_tweet(self, tweet):
        return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())
    
    def get_tweet_sentiment(self, tweet):
        result = TextBlob(self.clean_tweet(tweet))

        if result.sentiment.polarity > 0:
            return 'positive'
        elif result.sentiment.polarity == 0:
            return 'neutral'
        else:
            return 'negative'

    def get_tweets(self, query, count = 10):
        tweets = []

        try:
            fetched_tweets = self.api.search(q = query, count = count)
            
            for tweet in fetched_tweets:
                parsed_tweet = {}

                parsed_tweet['id'] = tweet.id_str
                parsed_tweet['text'] = tweet.text
                parsed_tweet['sentiment'] = self.get_tweet_sentiment(tweet.text)

                if tweet.retweet_count > 0:
                    if parsed_tweet not in tweets:
                        tweets.append(parsed_tweet)
                else:
                    tweets.append(parsed_tweet)
            return tweets
        except tweepy.TweepError as e:
            print("Error getting tweets")
'''
def main():
    api = TwitterClient()
    tweets = api.get_tweets(query = 'Donald Trump', count = 200)

    ptweets = []
    for tweet in tweets:
        if tweet['sentiment'] == 'positive':
            ptweets.append(tweet)
    print("Positive tweets percentage: {} %".format(100*len(ptweets)/len(tweets)))

    ntweets = []
    for tweet in tweets:
        if tweet['sentiment'] == 'negative':
            ntweets.append(tweet)
    print("Negative tweets percentage: {} %".format(100*len(ntweets)/len(tweets)))

    print("\n\nPositive Tweets:")
    for tweet in ptweets[:10]:
        print(tweet['text'])

    print("\n\nNegative Tweets:")
    for tweet in ntweets[:10]:
        print(tweet['text'])

if __name__ == "__main__":
    main()
'''