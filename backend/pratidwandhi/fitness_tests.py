import cv2
import numpy as np
import math
import os
# Load OpenPose COCO model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
protoFile = os.path.join(BASE_DIR, "models", "pose_deploy_linevec.prototxt")
weightsFile = os.path.join(BASE_DIR, "models", "pose_iter_440000.caffemodel")
net = cv2.dnn.readNetFromCaffe(protoFile, weightsFile)

# COCO keypoints
KEYPOINTS = {
    "Nose":0, "Neck":1, "RShoulder":2, "RElbow":3, "RWrist":4,
    "LShoulder":5, "LElbow":6, "LWrist":7, "RHip":8, "RKnee":9,
    "RAnkle":10, "LHip":11, "LKnee":12, "LAnkle":13, "REye":14,
    "LEye":15, "REar":16, "LEar":17, "Background":18
}

class FitnessTests:
    def __init__(self, scale_px_per_cm=None):
        self.scale = scale_px_per_cm
        self.situp_count = 0
        self.situp_state = None
        self.stand_hip_y = None
        self.jump_detected = False
        self.max_hip_y = None

    def set_scale_from_known_height(self, pixel_height, real_height_cm):
        self.scale = pixel_height / real_height_cm
        print(f"Calibration set: {self.scale:.3f} px per cm")

    def px_to_cm(self, px):
        if not self.scale or self.scale == 0:
            return None
        return px / self.scale

    def estimate_height(self, points):
        try:
            top = points[KEYPOINTS['Nose']][1]
            left_ankle = points[KEYPOINTS['LAnkle']][1]
            right_ankle = points[KEYPOINTS['RAnkle']][1]
            bottom = max(left_ankle, right_ankle)
        except:
            return None
        pixel_height = bottom - top
        height_cm = self.px_to_cm(pixel_height)
        return height_cm, pixel_height

    def process_vertical_jump(self, points):
        try:
            hip = (points[KEYPOINTS['LHip']][1] + points[KEYPOINTS['RHip']][1]) // 2
        except:
            return None
        if self.stand_hip_y is None:
            self.stand_hip_y = hip
            self.max_hip_y = hip
            return None
        if hip < self.max_hip_y:
            self.max_hip_y = hip
        thresh_px = 10
        if hip < self.stand_hip_y - thresh_px:
            self.jump_detected = True
        if self.jump_detected and hip >= self.stand_hip_y - 5:
            jump_px = self.stand_hip_y - self.max_hip_y
            jump_cm = self.px_to_cm(jump_px)
            self.jump_detected = False
            self.max_hip_y = self.stand_hip_y
            return jump_cm, jump_px
        return None

    def process_situp(self, points):
        try:
            shoulder = (
                (points[KEYPOINTS['LShoulder']][0] + points[KEYPOINTS['RShoulder']][0])//2,
                (points[KEYPOINTS['LShoulder']][1] + points[KEYPOINTS['RShoulder']][1])//2
            )
            hip = (
                (points[KEYPOINTS['LHip']][0] + points[KEYPOINTS['RHip']][0])//2,
                (points[KEYPOINTS['LHip']][1] + points[KEYPOINTS['RHip']][1])//2
            )
            knee = (
                (points[KEYPOINTS['LKnee']][0] + points[KEYPOINTS['RKnee']][0])//2,
                (points[KEYPOINTS['LKnee']][1] + points[KEYPOINTS['RKnee']][1])//2
            )
        except:
            return None
        ba = (shoulder[0]-hip[0], shoulder[1]-hip[1])
        bc = (knee[0]-hip[0], knee[1]-hip[1])
        dot = ba[0]*bc[0] + ba[1]*bc[1]
        mag = math.hypot(*ba)*math.hypot(*bc)
        if mag == 0:
            ang = 0
        else:
            ang = math.degrees(math.acos(dot/mag))
        folded_thresh = 50
        extended_thresh = 100
        if self.situp_state is None:
            self.situp_state = 'folded' if ang < folded_thresh else 'extended'
            return None
        if self.situp_state == 'extended' and ang < folded_thresh:
            self.situp_state = 'folded'
            self.situp_count += 1
            return ('count', self.situp_count)
        if self.situp_state == 'folded' and ang > extended_thresh:
            self.situp_state = 'extended'
        return None

# Main loop
# cap = cv2.VideoCapture(0)
# tests = FitnessTests()

# while True:
#     ret, frame = cap.read()
#     if not ret:
#         break

#     frameWidth = frame.shape[1]
#     frameHeight = frame.shape[0]

#     inpBlob = cv2.dnn.blobFromImage(frame, 1.0/255, (368,368), (0,0,0), swapRB=False, crop=False)
#     net.setInput(inpBlob)
#     output = net.forward()
#     H, W = output.shape[2], output.shape[3]

#     points = []
#     for i in range(len(KEYPOINTS)-1):
#         probMap = output[0,i,:,:]
#         _, conf, _, point = cv2.minMaxLoc(probMap)
#         x = int((frameWidth * point[0]) / W)
#         y = int((frameHeight * point[1]) / H)
#         if conf > 0.1:
#             points.append((x, y))
#             cv2.circle(frame, (x, y), 4, (0,255,0), -1)
#         else:
#             points.append((0,0))

#     # Fitness estimations
#     height = tests.estimate_height(points)
#     if height and height[0] is not None:
#         cv2.putText(frame, f"Height: {height[0]:.1f} cm", (10,30),
#                     cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255,255,255), 2)

#     jump = tests.process_vertical_jump(points)
#     if jump and jump[0] is not None:
#         cv2.putText(frame, f"Jump: {jump[0]:.1f} cm", (10,60),
#                     cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,255,0), 2)

#     situp = tests.process_situp(points)
#     if situp and situp[1] is not None:
#         cv2.putText(frame, f"Sit-ups: {situp[1]}", (10,90),
#                     cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,255,255), 2)

#     cv2.imshow('Fitness OpenCV', frame)
#     key = cv2.waitKey(1) & 0xFF
#     if key == ord('q'):
#         break
#     elif key == ord('c'):
#         h_cm_input = float(input("Enter your real height in cm for calibration: "))
#         if height and height[1] > 0:
#             tests.set_scale_from_known_height(height[1], h_cm_input)

# cap.release()
# cv2.destroyAllWindows()
