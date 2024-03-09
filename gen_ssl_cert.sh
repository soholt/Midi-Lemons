#!/bin/sh
openssl req -subj "/CN=midi-lemons.soho.lt.local/O=Midi-Lemons/C=LT/OU=Midi-Lemons" -new -newkey rsa:2048 -sha256 -days 3650 -nodes -x509 -keyout ./midi-lemons.key -out ./midi-lemons.crt
