import UndoBlock, {BasePairProbabilityTransform} from "../UndoBlock";
import EPars from "../EPars";
import Folder from "../folding/Folder";
import Vienna2 from "../folding/Vienna2";
import LinearFoldV from "eterna/folding/LinearFoldV";
import EternaFold from "eterna/folding/Eternafold";

function CreateFolder(type: any): Promise<Folder> {
    return type.create();
}

test(`Assemble branches`, () => {
    let foo: UndoBlock = new UndoBlock(EPars.stringToSequence('gcgcaaaagcgc'), Vienna2.NAME);
    // Imagine you have:
    // gcgcaaaagcgc => [1,12,1,2,11,1,3,10,1,4,9,1]
    let bpp: number[] = [1,12,1,2,11,1,3,10,1,4,9,1];
    // 11+9+7+5 divided by four bps is 8
    // biggest possible value is 11, so our number is 8/11
    // this is 1-8/11 = 3/11 branchy, or 0.272727
    expect(foo.ensembleBranchiness(bpp, BasePairProbabilityTransform.SQUARE)).toBeCloseTo(0.272727, 5);

    // now imagine:
    // gcgcaaaagcgcgc => [1,12,0.50,2,11,0.50,3,10,0.50,4,9,0.50,1,14,0.50,2,13,0.50,3,12,0.50,4,11,0.50]
    foo = new UndoBlock(EPars.stringToSequence('GCGCAAAAGCGCGC'), Vienna2.NAME);
    bpp = [1,12,0.50,2,11,0.50,3,10,0.50,4,9,0.50,1,14,0.50,2,13,0.50,3,12,0.50,4,11,0.50];
    // 11+9+7+5 => 8; 13+11+9+7 => 10; 9
    // biggest possible value is 13, so our number is 1 - 9/13
    expect(foo.ensembleBranchiness(bpp, BasePairProbabilityTransform.SQUARE)).toBeCloseTo(0.307692, 5);

});

test(`Branch Step Back`, () => {
    let foo: UndoBlock = new UndoBlock(EPars.stringToSequence('GCGCAAAAGCGC'), Vienna2.NAME);
    // Imagine you have:
    // gcgcaaaagcgc => [1,12,1,2,11,1,3,10,1,4,9,1]
    let pairs: number[] = [11,10,9,8,-1,-1,-1,-1,3,2,1,0];
    // 11+9+7+5 divided by four bps is 8
    expect(foo.branchiness(pairs)).toBeCloseTo(0.272727, 5);

    // now imagine:
    // gcgcaaaagcgcgc => [1,12,0.50,2,11,0.50,3,10,0.50,4,9,0.50,1,14,0.50,2,13,0.50,3,12,0.50,4,11,0.50]
    foo = new UndoBlock(EPars.stringToSequence('GCGCAAAAGCGCGC'), Vienna2.NAME);
    pairs = [13,12,11,10,-1,-1,-1,-1,-1,-1,3,2,1,0];
    // 11+9+7+5 
    expect(foo.branchiness(pairs)).toBeCloseTo(0.230769, 5);

});

test('UndoBlock Test', () => {
    expect(CreateFolder(Vienna2)
        .then((vienna) => {
            
            let seq: number[] = EPars.stringToSequence('GGGGAAAACCCC');
            let foo: UndoBlock = new UndoBlock(seq, vienna.name);
            let bpps: number[] = vienna.getDotPlot(seq, [], 37, false) as number[];
            expect(foo.ensembleBranchiness(bpps, BasePairProbabilityTransform.SQUARE)).toBeCloseTo(0.273453, 3);

            seq = EPars.stringToSequence('GCUAGAAAUGGGUG');
            foo = new UndoBlock(seq, vienna.name);
            bpps = vienna.getDotPlot(seq, [], 37, false) as number[];
            expect(foo.ensembleBranchiness(bpps, BasePairProbabilityTransform.SQUARE)).toBeCloseTo(0.399375, 3);
    }))
    .resolves.toBeUndefined();
});

test('Pairing Probability Test', () => {
    expect(CreateFolder(Vienna2)
        .then((vienna) => {
            
            let seq: number[] = EPars.stringToSequence('GGGGAAAACCCC');
            let foo: UndoBlock = new UndoBlock(seq, vienna.name);
            let bpps: number[] = vienna.getDotPlot(seq, [], 37, false) as number[];
            expect(foo.sumProbUnpaired(bpps, BasePairProbabilityTransform.SQUARE)).toBeCloseTo(4.3256, 4);

            seq = EPars.stringToSequence('GCUAGAAAUGGGUG');
            foo = new UndoBlock(seq, vienna.name);
            bpps = vienna.getDotPlot(seq, [], 37, false) as number[];
            expect(foo.sumProbUnpaired(bpps, BasePairProbabilityTransform.SQUARE)).toBeCloseTo(10.2378, 4);
    }))
    .resolves.toBeUndefined();
});

test('Pair Transform Test', () => {
    expect(CreateFolder(EternaFold)
        .then((eternafold) => {
            const seq = EPars.stringToSequence('GGGGAAACCC');
            const foo = new UndoBlock(seq, eternafold.name);
            const bpps = eternafold.getDotPlot(seq, [], 37, false) as number[];
            expect(foo.targetExpectedAccuracy(
                EPars.parenthesisToPairs('(((....)))'),
                bpps,
                BasePairProbabilityTransform.LEAVE_ALONE)
            ).toBeCloseTo(0.8607, 4);
    }))
    .resolves.toBeUndefined();
});
