package tree_sitter_basic_test

import (
	"testing"

	tree_sitter_basic "github.com/ra77a3l3-jar/tree-sitter-basic/bindings/go"
	tree_sitter "github.com/tree-sitter/go-tree-sitter"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_basic.Language())
	if language == nil {
		t.Errorf("Error loading C grammar")
	}
}
