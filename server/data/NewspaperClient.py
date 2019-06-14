import newspaper
from newspaper import Article

class NewspaperClient(object):

    def __init__(self):

        self.sites = ['http://cnn.com', 'https://www.foxnews.com/', 'https://www.nytimes.com/', 'https://www.huffpost.com/', 'https://www.nbcnews.com/']
    
    def parse_query(self, query):
        if not any(char.isdigit() for char in query):
            return query.lower().split(' ')
        return query.split(' ')

    def get_urls(self, query, quantity):
        urls = []
        amount = quantity / len(self.sites)

        for i in range(len(self.sites)):
            paper = newspaper.build(self.sites[i], memoize_articles=False)

            count = 0
            for article in paper.articles:
                if count == amount:
                    break
                #print(article.url)
                if any(element in article.url for element in query):
                    #print(article.url)
                    urls.append(article.url)
                    count += 1
        
        return urls
    
    def get_words(self, articles):
        keywords = []

        for i in range(len(articles)):
            article = Article(articles[i])
            article.download()
            article.parse()
            article.nlp()
            keywords.extend(article.keywords)
        
        return keywords
'''
def main():
    client = NewspaperClient()
    query = client.parse_query("trump")
    articles = client.get_urls(query)

    print(articles)
    
if __name__ == "__main__":
    main()
'''