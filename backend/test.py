import matplotlib.pyplot as plt
import numpy as np
from pydub import AudioSegment
from scipy.io import wavfile
from pydub.playback import play # Used for playing sound in Python


samplerate, data = wavfile.read('/Users/lucaspao/Documents/Coding/tap-jams/frontend/src/assets/sounds/Hi-Hats/Acoustic Hat-06.wav')
result = 0.1 * data
print(result)
print(data)

time = np.linspace(0., 1., data.shape[0])
plt.plot(time, result[:], label="Left channel")
plt.legend()
plt.xlabel("Time [s]")
plt.ylabel("Amplitude")
plt.show()