#!/usr/bin/env python3

import rasterio
import numpy as np
import os
from matplotlib import pyplot as plt
import math

def scale(band):
    return band/500

def isgreen(rgb):
    return (rgb[0] > 0.9 and rgb[1] < 0.6 and rgb[2] < 0.6)

def iswhite(rgb):
    return (rgb[0] > 0.7 and rgb[1] > 0.7 and rgb[2] > 0.7)

year = 2011
composedMap = []
greenMap = []
whiteMap = []

images = [
    "data_analysis/2011.TIF",
    "data_analysis/2012.TIF",
    "data_analysis/2013.TIF"
]

satdat = rasterio.open(images[year-2011])

row_min = 0
col_min = 0

row_max = satdat.height - 1
col_max = satdat.width - 1

topleft = satdat.transform * (row_min, col_min)
botright = satdat.transform * (row_max, col_max)

from pyproj import Proj, transform

inProj = Proj(init='epsg:32759')
outProj = Proj(init='epsg:4326')
x1,y1 = topleft
tl_long,tl_lat = transform(inProj,outProj,x1,y1)
print ("topleft",tl_long,tl_lat) #long, lat
x1,y1 = botright
br_long,br_lat = transform(inProj,outProj,x1,y1)
print ("botright",tl_long,tl_lat) #long, lat

# loop throuogh a list of available images 
# and add the processed image to composedMap 
for year in range(2011, 2014):
    year -= 2011
    satdat = rasterio.open(images[year])

    width = satdat.width - 1 
    # width 2007
    height = satdat.height - 1 
    # height 1620

    
    # getting the 4 bands 
    blue, green, red, nir = satdat.read()

    # resize the values to display properly
    blue = scale(satdat.read(1))
    green = scale(satdat.read(2))
    red = scale(satdat.read(3))
    nir = scale(satdat.read(4))

    
    # create some custom mapping to help
    # rgb the normal image see by eye
    rgb = np.dstack((red,green,blue))
    
    # nrg identifies vegetation and color them red
    nrg = np.dstack((nir, red, green))
    
    # bgrn is the native 4 band order from the data
    bgrn = np.dstack((blue,green,red,nir))

    # create a black background and display vegetation as green dots on it
    greenmap = np.zeros((height,width,3))
    for a in range(0,height-2):
        for b in range(0,width-2):
            if isgreen(nrg[a][b]) and isgreen(nrg[a+2][b+2]):
                greenmap[a][b][1] = 1  #nrg[a][b]

    # create a black background and display white rooftops as white pixels
    whitemap = np.zeros((height,width,3))
    for a in range(0,height-2):
        for b in range(0,width-2):
            if iswhite(nrg[a][b]) and iswhite(nrg[a+2][b+2]):
                whitemap[a][b] = [1,1,1]   #nrg[a][b]

    # combining the 2 map to a single image of [width x height x 3]  
    greenMap.append(greenmap)    
    whiteMap.append(whitemap)    
    composedMap.append(whitemap + greenmap)

def display(year):
    plt.imshow(composedMap[year-2011])

def compare(year1,year2):
     plt.imshow(composedMap[year2-2011] - composedMap[year1-2011])

def convert_coordinates(coord1=[-43.535000, 172.6108000], coord2=[-43.53000, 172.64100]):
    print(topleft,tl_long,tl_lat)
    print(botright,br_long,br_lat)


    latspan = abs(br_lat-tl_lat)
    longspan = abs(br_long-tl_long)


    # check if is out of bound
    if not ((tl_lat<coord1[0]<br_lat or tl_lat>coord1[0]>br_lat) and (tl_long<coord1[1]<br_long or tl_long>coord1[1]>br_long)):
        print("out of bound")
        return None
    elif not ((tl_lat<coord2[0]<br_lat or tl_lat>coord2[0]>br_lat) and (tl_long<coord2[1]<br_long or tl_long>coord2[1]>br_long)):
        print("out of bound")
        return None
    else:
        # get a tl, br
        tl = [max(coord1[0],coord2[0]),min(coord1[1],coord2[1])]
        br = [min(coord1[0],coord2[0]),max(coord1[1],coord2[1])]


        tl = [math.floor((tl_lat-tl[0])/latspan*height),math.floor((tl[1]-tl_long)/longspan*width)]
        br = [math.floor((tl_lat-br[0])/latspan*height),math.floor((br[1]-tl_long)/longspan*width)]
    

        return tl, br

def getvege(tl,br,year,greenMap=greenMap):
    greenmap = greenMap[year-2011]
    size = abs((br[0]-tl[0])*(br[1]-tl[1]))
    newmap = greenmap[tl[0]:br[0],tl[1]:br[1],:]
    count = sum(sum(sum(newmap)))
    return count/size

def getind(tl,br,year,whiteMap=whiteMap):
    whitemap = whiteMap[year-2011]
    size = abs((br[0]-tl[0])*(br[1]-tl[1]))
    newmap = whitemap[tl[0]:br[0],tl[1]:br[1],:]
    count = sum(sum(sum(newmap)))

    return count/size

tl, br = convert_coordinates()
print(getvege(tl,br,2013,greenMap))
print(getind(tl,br,2011,whiteMap))
