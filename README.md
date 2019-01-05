## Description

This is a VS Code extension providing syntax highlighting and basic autocomplete 
for the assembly language in used in Go. It applies mostly to amd64/x86/x64, 
but colors most of the other architectures as well. 

### Disclaimer

This is far from a complete or even very good syntax highlighter, but I think
it covers a lot of the basics. It may improve over time. For issues, comments, 
recommendations etc, please file an issue on github.

The autocomplete and highlighting for instructions was mostly cobbled together 
by scripts based on information found in:
- [the Go source](https://github.com/golang/go/tree/master/src/cmd/internal/obj/x86)
- https://godoc.org/golang.org/x/arch/x86
- [searchable x86 instruction manual](https://cmpsb.net/asm/x86/instr/)