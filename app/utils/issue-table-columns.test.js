import { describe, expect, test } from 'vitest';
import { computeIssueTableColumns } from './issue-table-columns.js';

describe('utils/issue-table-columns', () => {
  test('returns minimum widths when there are no issues', () => {
    const widths = computeIssueTableColumns([]);

    expect(widths).toEqual({
      id_width_ch: 12,
      type_width_ch: 8
    });
  });

  test('grows widths based on content length', () => {
    const widths = computeIssueTableColumns([
      { id: 'dream-crates-abc-123', issue_type: 'feature' }
    ]);

    expect(widths.id_width_ch).toBe(22);
    expect(widths.type_width_ch).toBe(9);
  });

  test('clamps widths to configured bounds', () => {
    const widths = computeIssueTableColumns([
      {
        id: 'dream-crates-really-long-issue-identifier-that-keeps-going',
        issue_type: 'feature'
      }
    ]);

    expect(widths.id_width_ch).toBe(28);
    expect(widths.type_width_ch).toBe(9);
  });
});

