# d3-face
### HTML Standby Screen for D3 Robot : Drawing and Animating a Smiley's Facial Expressions on a Webpage.

```
Python2 : python -m SimpleHTTPServer 8000
Python3 : python -m http.server 8000
```

## Facial Parameterization

#### A facial parameterization method of a smiley newly developed in this repository to represent various facial expressions and their smooth changes in a much simpler way with HTML5 canvas.

### Upper lip (Bezier Curve)

![Upper_Lip_Explained](https://user-images.githubusercontent.com/68853120/184422528-763fb6ee-f612-40dc-8389-ee1e00a641ac.png)

- LT
  - Position of the endpoint of left mouth corner
  - [x offset, y offset]

- RT
  - Position of the endpoint of right mouth corner
  - [x offset, y offset]

- LBDeg
  - Direction of the left mouth corner
  - angle (degree) in range [-90, 90]

- RBDeg
  - Direction of the right mouth corner
  - angle (degree) in range [-90, 90]
   
   
### Lower lip (Bezier Curve)

![Lower_Lip_Explained](https://user-images.githubusercontent.com/68853120/184422492-9a79977c-f84b-40df-91a0-bf84b63f6bab.png)

- DL
  - The extent to which the left-side of a mouth is opened
  - value in range [0, 100]
  - zero-reference: current LBDeg

- DR
  - The extent to which the right-side of a mouth is opened
  - value in range [0, 100]
  - zero-reference: current RBDeg

  
### Eyes (Ellipse)

![Eyes_Explained](https://user-images.githubusercontent.com/68853120/184422564-dd38d023-efda-4bc8-aa49-d80d99ca9846.png)

- LTBrow
  - The extent to which the upper part of a left eye is closed
  - value in range [0, 100]

- LBBrow
  - The extent to which the lower part of a left eye is closed
  - value in range [0, 100]

- RTBrow
  - The extent to which the upper part of a right eye is closed
  - value in range [0, 100]

- RBBrow
  - The extent to which the lower part of a right eye is closed
  - value in range [0, 100]

- EyeDir
  - Gaze direction
  - [radius, angle(degree) in range (-180, 180)]

  
## Parameter values for each facial expressions : 'face_lab' branch screen captures

### happy
![happy](https://user-images.githubusercontent.com/68853120/181467725-b605375d-b763-44c6-aca1-7c4e7ca55edc.png)


### smile
![smile](https://user-images.githubusercontent.com/68853120/181467855-a6e83c15-bbcb-43a3-af68-2ebcddbd1486.png)


### annoy
![annoy](https://user-images.githubusercontent.com/68853120/181467888-ec431ce0-2490-4255-b9cb-4ab2ab0e1f30.png)


### angry
![angry](https://user-images.githubusercontent.com/68853120/181467925-0446010c-6a5b-4e47-9987-c863c8fa7455.png)


### laugh
![laugh](https://user-images.githubusercontent.com/68853120/181467964-5aeb6832-e463-4ddc-93aa-a2a30513b3d8.png)


### surprise
![surprise](https://user-images.githubusercontent.com/68853120/181468015-e0b3bb54-0a1a-46ac-b8bd-c28fbee3d42d.png)


### sleepy
![sleepy](https://user-images.githubusercontent.com/68853120/181468066-bb671f1b-c7f5-40d8-8245-96c94428b928.png)


### disapprove0
![disapprove0](https://user-images.githubusercontent.com/68853120/181468139-54202511-39c2-40ab-9589-3f9bd67159b2.png)


### disapprove1
![disaprrove1](https://user-images.githubusercontent.com/68853120/181468199-37b3a442-2304-44f4-990b-cdaa2d46ff5e.png)


### sneer
![sneer](https://user-images.githubusercontent.com/68853120/181468234-d82970b8-dbdd-4818-b093-5a73b3f309e2.png)


### disgust
![disgust](https://user-images.githubusercontent.com/68853120/181468318-5dc0f2a4-db3d-4f4e-b71d-92da397e7d6f.png)
