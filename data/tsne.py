import csv
import numpy as np
from sklearn.manifold import TSNE


data = np.loadtxt(open("design_matrix.csv", "rb"), delimiter=",", skiprows=1)
emotions = np.loadtxt(open("mean_emotion_ratings.csv", "rb"), delimiter=",", skiprows=1)[:,1:]
embedding = TSNE(n_components=2, perplexity=20).fit_transform(emotions)
ids = np.array([range(1, 201)])
id_embedding = np.append(ids.T, embedding, axis=1)
full_data = np.append(id_embedding, emotions, axis=1)
np.savetxt("tsne.csv", full_data, fmt='%i,%10.3f,%10.3f,%10.3f,%10.3f,%10.3f,%10.3f', delimiter='\t', header="ID,X,Y,scary,happy,sad,peaceful")



