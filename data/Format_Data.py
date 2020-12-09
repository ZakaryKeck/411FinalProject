import csv
import json
import numpy as np
import matplotlib.pyplot as plt

def format_attribute_row(row):
    axes = ['Register','Mode','Tempo','Soundlevel','Articulation','Timbre','Melody']
    
    data = [{"axis": axis, "value": int(value)} for axis, value in zip(axes, row[1:])]

    return data


def format_emotion_row(row):
    axes = ['Scary', 'Happy', 'Sad', 'Peaceful']

    data = [{"axis": axis, "value": int(float(value))} for axis, value in zip(axes, row[1:])]

    return data

def makeFiles():
    attribute_data = []

    with open('design_matrix.csv') as file:
        csv_reader = csv.reader(file, delimiter=',')
        file.readline() # skip first line
        for row in csv_reader:
            attribute_data.append(format_attribute_row(row))

    with open('attributes.js', 'w') as outfile:  
        outfile.write('var attributes = ')
        json.dump(attribute_data, outfile, indent=4) 

    emotion_data = []

    with open('mean_emotion_ratings.csv') as file:
        csv_reader = csv.reader(file, delimiter=',')
        file.readline() # skip first line
        for row in csv_reader:
            emotion_data.append(format_emotion_row(row))

    with open('emotions.js', 'w') as outfile:  
        outfile.write('var emotions = ')
        json.dump(emotion_data, outfile, indent=4)

    #makeGraph(attribute_data, emotion_data)

def makeGraph(a_data, e_data):
    x = []
    y = []

    N = len(a_data)
    colors = np.random.rand(N)
    
    area = (30 * np.random.rand(N))**2  # 0 to 15 point radii

    print(len(e_data[0]))
    for j in range(0, len(e_data[0])): #each emotion
        for k in range(0, len(a_data[0])): # each attribute
            x.clear()
            y.clear()
            for i in range(0, len(e_data)):
                
                x.append(e_data[i][j]['value'])
                y.append(a_data[i][k]['value'])

            x_label = e_data[0][j]['axis']
            y_label = a_data[0][k]['axis']
            plt.xlabel(x_label)
            plt.ylabel(y_label)

            plt.scatter(x, y, s=area, c=colors, alpha=0.5)
            
            plt.show()

makeFiles()
