import numpy as np
from sklearn.manifold import TSNE

data = np.loadtxt(open("design_matrix.csv", "rb"), delimiter=",", skiprows=1)
ids = np.loadtxt(open("mean_emotion_ratings.csv", "rb"), delimiter=",", skiprows=1)[:,:1]
emotions = np.loadtxt(open("mean_emotion_ratings.csv", "rb"), delimiter=",", skiprows=1)[:,1:]
distances = []
for i in range(len(emotions)):
	emotion1 = emotions[i]
	emotion1_dist = []
	for j in range(len(emotions)):
		if i == j:
			continue
		emotion2 = emotions[j]
		diff = np.square(emotion1 - emotion2)
		dist = np.sqrt(np.sum(diff))
		both = (dist, j+1)
		emotion1_dist.append(both)

	distances.append(emotion1_dist)

sorted_distances = []
for dist in distances:
	sorted_dist = sorted(dist, key=lambda x: x[0])
	top_three = sorted_dist[:3]
	single_array = []
	for top in top_three:
		x, y = top
		single_array.append(x)
		single_array.append(y)
	sorted_distances.append(single_array)

ids_sorted_distances = np.append(ids, np.array(sorted_distances), axis=1)
np.savetxt("three_nearest.csv", ids_sorted_distances, fmt='%i,%10.3f,%i,%10.3f,%i,%10.3f,%i', delimiter=',', header="ID,first_dist,first,second_dist,second,third_dist,third")


