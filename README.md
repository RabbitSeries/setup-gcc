# setup-gcc

```
inputs:
  version:
    description: GCC version to install (Linux only for apt, MacOS brew and Windows MSYS pacman is rolling to their distro's latest)
    required: false
    default: "13"
```

## Usage
```yml
- uses: RabbitSeries/setup-gcc@v1
with:
    version: 14
```
Or just default to 13 ( linux ) or latest ( Mac/Windows)
```yml
- uses: RabbitSeries/setup-gcc@v1
```