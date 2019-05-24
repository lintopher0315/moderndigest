import newspaper
from newspaper import Article

class NewspaperClient(object):

    def __init__(self):

        self.sites = ['http://cnn.com', 'https://www.foxnews.com/', 'https://www.nytimes.com/', 'https://www.huffpost.com/', 'https://www.nbcnews.com/']
    
    def parse_query(self, query):
        if not any(char.isdigit() for char in query):
            return query.lower().split(' ')
        return query.split(' ')

    def get_urls(self, query):
        urls = []

        for i in range(len(self.sites)):
            paper = newspaper.build(self.sites[i], memoize_articles=False)

            for article in paper.articles:
                #print(article.url)
                if any(element in article.url for element in query):
                    #print(article.url)
                    urls.append(article.url)
        
        return urls
'''
def main():
    client = NewspaperClient()
    query = client.parse_query("trump")
    articles = client.get_urls(query)

    print(articles)
    
if __name__ == "__main__":
    main()
'''